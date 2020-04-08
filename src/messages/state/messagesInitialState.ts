import { Message } from './types/messagesTypes';

export type MessagesState = {
  messages: Message[];
  dismissed: { [id: string]: boolean };
};

const messagesInitialState = {
  messages: [],
  dismissed: {},
};

export default messagesInitialState;
