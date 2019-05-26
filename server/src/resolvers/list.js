import { combineResolvers } from 'graphql-resolvers';
import Sequelize from 'sequelize';
// import _ from 'lodash';
import arrayMove from 'array-move';

import { isAuthenticated } from './middlewares/auth';

export default {
  Query: {
    list: async (parent, args, context) => await context.models.List.findByPk(args.input.id),
    lists: async (parent, args, context) => await context.models.List.findAll(), // TODO: pagination
  },
  List: {
    creator: async (parent, args, context) => await context.models.User.findByPk(parent.dataValues.creatorID),
    maintainers: async (parent, args, context) => await context.models.User.findAll({ where: { id: { [Sequelize.Op.in]: parent.dataValues.maintainersIDs } } }),
    items: async (parent, args, context) => {
      const items = await context.models.ListItem.findAll({ where: { id: { [Sequelize.Op.in]: parent.dataValues.listItemIDs } } });
      return parent.dataValues.listItemIDs.map(id => items.find(item => item.id === id)); // we depend on array indexes to order the returned array
    },
  },
  ListItem: {
    creator: async (parent, args, context) => await context.models.User.findByPk(parent.dataValues.creatorID),
  },
  Mutation: {
    createList: combineResolvers(
      isAuthenticated,
      async (parent, args, context) => {
        const list = await context.models.List.create({
          name: args.input.name,
          description: args.input.description,
          coverPhoto: args.input.coverPhoto,
          creatorID: context.me.id,
          maintainersIDs: [context.me.id],
        });

        context.models.User.update(
          { maintainedListsIDs: Sequelize.fn('array_append', Sequelize.col('maintainedListsIDs'), list.id) },
          { where: { id: context.me.id } }
        );
        return list;
      },
    ),
    editList: combineResolvers(
      isAuthenticated,
      async (parent, args, context) => {
        const list = await context.models.List.update(
          {
            name: args.input.name,
            description: args.input.description,
            coverPhoto: args.input.coverPhoto,
          },
          {
            where: { id: args.input.listID },
            returning: true,
          },
        );
        return list[1][0];
      },
    ),
    deleteList: combineResolvers(
      isAuthenticated,
      async (parent, args, context) => {
        const res = await context.models.List.destroy({
          where: { id: args.input.listID },
        });

        return res;
      },
    ),
    createListItem: combineResolvers(
      isAuthenticated,
      async (parent, args, context) => {
        const listItem = await context.models.ListItem.create({
          name: args.input.name,
          link: args.input.link,
          mainLanguages: args.input.mainLanguages,
          tranlationLanguages: args.input.tranlationLanguages,
          description: args.input.description,
          creatorID: context.me.id,
        });

        context.models.List.update(
          { listItemIDs: Sequelize.fn('array_append', Sequelize.col('listItemIDs'), listItem.id) },
          { where: { id: args.input.listID } }
        );

        return listItem;
      },
    ),
    editListItem: combineResolvers(
      isAuthenticated,
      async (parent, args, context) => {
        const listItem = await context.models.ListItem
          .update(
            {
              name: args.input.name,
              link: args.input.link,
              mainLanguages: args.input.mainLanguages,
              tranlationLanguages: args.input.tranlationLanguages,
              description: args.input.description,
            },
            {
              where: { id: args.input.id },
              returning: true,
            },
          );

        return listItem[1][0];
      },
    ),
    addItemToList: combineResolvers(
      isAuthenticated,
      async (parent, args, context) => {
        return (await context.models.List.update(
          { listItemIDs: Sequelize.fn('array_append', Sequelize.col('listItemIDs'), args.input.listItemID) },
          { where: { id: args.input.listID }, returning: true }
        ))[1][0];
      },
    ),
    changeItemOrder: combineResolvers(
      isAuthenticated,
      async (parent, args, context) => {
        const list = await context.models.List.findByPk(args.input.listID);
        const currentIndex = list.listItemIDs.findIndex(x => x === args.input.listItemID);

        const newList = arrayMove(list.listItemIDs, currentIndex, args.input.newOrder);

        return (await context.models.List.update(
          { listItemIDs: newList },
          {
            where: { id: args.input.listID },
            returning: true,
          },
        ))[1][0];
      },
    ),
    removeItemFromList: combineResolvers(
      isAuthenticated,
      async (parent, args, context) => {
        const newList = (await context.models.List.findByPk(args.input.listID)).listItemIDs.filter(x => x !== args.input.listItemID);

        return (await context.models.List.update(
          { listItemIDs: newList },
          {
            where: { id: args.input.listID },
            returning: true,
          },
        ))[1][0];
      },
    ),
  },
};
