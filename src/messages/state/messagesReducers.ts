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
      if (state.deleted[action.payload.id]) {
        return state;
      }
      return {
        ...state,
        active: [...state.active, action.payload],
      };
    case messagesActions.DELETE_MESSAGE:
      return {
        ...state,
        active: state.active.filter(({ id }) => id !== action.payload.id),
        deleted: {
          ...state.deleted,
          [action.payload.id]: true,
        },
      };
    default:
      return state;
  }
};

export default messagesReducers;
