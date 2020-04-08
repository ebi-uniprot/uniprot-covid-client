import { ActionType } from 'typesafe-actions';
import * as messagesActions from './messagesActions';
import messagesInitialState, { MessagesState } from './messagesInitialState';

export type MessagesAction = ActionType<typeof messagesActions>;

const messagesReducers = (
  state: MessagesState = messagesInitialState,
  action: MessagesAction
) => {
  switch (action.type) {
    case messagesActions.ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case messagesActions.DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(({ id }) => id !== action.payload.id),
        dismissed: { ...state.dismissed, [action.payload.id]: true },
      };
    default:
      return state;
  }
};

export default entryReducers;
