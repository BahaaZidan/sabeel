// import uuidv1 from 'uuid/v1';
import Sequelize from 'sequelize';
import _ from 'lodash';
import { combineResolvers } from 'graphql-resolvers';
import pubsub from '../subscription';
import { isAuthenticated } from './middlewares/auth';

const toCursorHash = string => Buffer.from(string).toString('base64');

const fromCursorHash = string => Buffer.from(string, 'base64').toString('ascii');

const getUserID = context => JSON.parse(context.req.headers['x-user-header']).id;
const getUserIDFromConnection = context => JSON.parse(context.connection.context.headers['x-user-header']).id;

const getPath = uid => `notifications/${uid}`;

const getCursoreOptions = cursor => cursor ? ({ createdAt: { [Sequelize.Op.lt]: fromCursorHash(cursor) } }) : ({});

/*
{
  "x-user-header": "{ \"id\":155}"
}
*/

export default {
  Query: {
    notifications: combineResolvers(
      // isAuthenticated,
      async (parent, args, context) => {
        const notificationsPromise = await context.models.Notification.findAll({
          order: [['createdAt', 'DESC']],
          limit: args.input?.limit ? args.input.limit + 1 : null,
          where: {
            ...getCursoreOptions(args.input?.cursor),
            recipientUIDs: {  [Sequelize.Op.contains]: [getUserID(context)] },
          }
        });

        const hasNextPage = notificationsPromise.length > args.input?.limit;
        const nodes = hasNextPage ? notificationsPromise.slice(0, -1) : notificationsPromise;
        const edges = nodes.map(edge => ({ node: edge, cursor: toCursorHash(edge.createdAt.toString()) }));
        
        const getEndCursor = allNodes => {
          console.log(allNodes);
          return allNodes.length > 0 ? toCursorHash(
            allNodes[allNodes.length - 1].createdAt.toString(),
          ) : null;
        };
        context.res.setHeader('Access-Control-Allow-Origin', process.env.ENGINE_BASE_URL);

        return {
          result: {
            edges,
            nodes,
            pageInfo: {
              hasNextPage,
              endCursor: getEndCursor(nodes),
            },
          },
        };
      },
    ),
  },

  NotificationsResult: {
    unreadCount: async (parent, args, context) => (await context.models.UserNotificationJunction.findAll({
      where: { userID: getUserID(context), read: false }
    })).length,
    unseenCount: async (parent, args, context) => (await context.models.UserNotificationJunction.findAll({
      where: { userID: getUserID(context), seen: false }
    })).length,
  },

  Notification: {
    read: async (parent, args, context) => await context.models.UserNotificationJunction.findOne({
      where: { userID: getUserID(context), notificationID: parent.id }
    }).then(result => result?.read),
    sender: async (parent, args, context) => ({ id: getUserID(context) }), // TODO: MUST HAVE ACCESS TO THE USERS TABLE IN INCORTA
  },

  Mutation: {
    createNotification: async (parent, args, context) => {
      const notification = {
        senderUID: getUserID(context),
        recipientUIDs: args.input.recipientUIDs,
        type: args.input.type,
        payload: args.input.payload,
      };

      const notificationPromise = await context.models.Notification.create({
        ...notification,
      });

      const junctionRows = args.input.recipientUIDs.map(uid => ({ userID: uid, notificationID: notificationPromise.id }));

      context.models.UserNotificationJunction.bulkCreate(junctionRows).then(async () => {
        const unseenCount = (await context.models.UserNotificationJunction.findAll({
          where: { userID: getUserID(context), seen: false },
        })).length;

        pubsub.publish(getPath(getUserID(context)), {
          unseenNotificationsCount: unseenCount,
        });
      });
      context.res.setHeader('Access-Control-Allow-Origin', process.env.ENGINE_BASE_URL);

      return ({
        result: notificationPromise,
        errors: null, //TODO
      });
    },

    markNotificationRead: async (parent, args, context) => {
      context.res.setHeader('Access-Control-Allow-Origin', process.env.ENGINE_BASE_URL);
      
      return await context.models.UserNotificationJunction
        .update(
          { read: true },
          { where: { userID: getUserID(context), notificationID: args.input.id } },
        )
        .then(async () => ({
          result: await context.models.Notification.findOne({ where: { id: args.input.id } }),
          errors: null, // TODO
        }));
    },

    markNotificationsSeen: async (parent, args, context) => await context.models.UserNotificationJunction.update(
      { seen: true },
      { where: { userID: getUserID(context) }, returning: true, },
    ).then(async (result) => {
      pubsub.publish(getPath(getUserID(context)), {
        unseenNotificationsCount: 0,
      });
      context.res.setHeader('Access-Control-Allow-Origin', process.env.ENGINE_BASE_URL);
      return ({
        result: await context.models.Notification.findAll({ where: { id: { [Sequelize.Op.or]: result[1].map(x => x.notificationID) } } }),
        errors: null, // TODO
      });
    }),
  },

  Subscription: {
    unseenNotificationsCount: {
      subscribe: (parent, args, context) => {
        return pubsub.asyncIterator(getPath(getUserIDFromConnection(context)));
      },
    },
  },
};