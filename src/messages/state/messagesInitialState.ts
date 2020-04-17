import {
  MessageType,
  MessageFormat,
  MessageLevel,
} from '../types/messagesTypes';
import { Location } from '../../urls';

export type MessagesState = {
  active: MessageType[];
  deleted: { [id: string]: boolean };
};

const messagesInitialState = {
  active: [],
  deleted: {},
};

export default messagesInitialState;
