import { PubSub } from 'apollo-server';

import * as NOTIFICATION_EVENTS from './notification';

export const EVENTS = {
    NOTIFICATION: NOTIFICATION_EVENTS,
};

export default new PubSub();