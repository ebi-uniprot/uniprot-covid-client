import {
  MessageType,
  MessageFormat,
  MessageLevel,
} from '../types/messagesTypes';

export type MessagesState = {
  active: MessageType[];
  deleted: { [id: string]: boolean };
};

const messagesInitialState = {
  active: [
    {
      id: 'msg1',
      content: 'lorem',
      format: MessageFormat.POP_UP,
      level: MessageLevel.INFO,
    },
    {
      id: 'msg2',
      content: 'ipsum',
      format: MessageFormat.POP_UP,
      level: MessageLevel.SUCCESS,
    },
  ],
  deleted: {},
};

export default messagesInitialState;
