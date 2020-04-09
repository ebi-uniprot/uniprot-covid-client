import { MessageType } from '../types/messagesTypes';

export type MessagesState = {
  active: MessageType[];
  deleted: { [id: string]: boolean };
};

const messagesInitialState = {
  active: [],
  deleted: {},
};

export default messagesInitialState;
