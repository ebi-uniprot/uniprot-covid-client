import { action } from 'typesafe-actions';

export const ADD_MESSAGE = 'ADD_MESSAGE';
export const DELETE_MESSAGE = 'DELETE_MESSAGE';

const ADD_MESSAGE = 'ADD_MESSAGE';
const DELETE_MESSAGE = 'DELETE_MESSAGE';

enum Level {
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
}
enum Format {
  POP_UP = 'POP_UP', // eg pops up as a small rectangle at the top right of the page
  IN_PAGE = 'IN_PAGE', // eg full width banner at the top of the page
  FULL_PAGE = 'FULL_PAGE', // eg graphic indicating no results found
}
type Message = {
  content: string | JSX.Element;
  format: Format;
  level: Level;
  dateTimeActive?: Date;
  dateTimeExpired?: Date;
};

// Dispatched within actions that resolve network requests
export const addMessage = (
  content,
  format,
  level,
  dateTimeActive,
  dateTimeExpired
) =>
  action(ADD_MESSAGE, {
    content,
    format,
    level,
    dateTimeActive,
    dateTimeExpired,
    id: uuid.v1(),
  });

// Dispatched by the Message Manager when the user has either seen the message or they dismiss it
export const deleteMessage = id =>
  action(DELETE_MESSAGE, {
    id,
  });
