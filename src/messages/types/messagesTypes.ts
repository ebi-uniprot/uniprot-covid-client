export enum Level {
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
  WARNING = 'WARNING',
  FAILURE = 'FAILURE',
}

export enum Format {
  POP_UP = 'POP_UP', // eg pops up at the bottom right of the page
  IN_PAGE = 'IN_PAGE', // eg full width banner at the top of the page
}

export type MessageType = {
  id: string;
  content: string | JSX.Element;
  format: Format;
  level: Level;
  dateTimeActive?: Date;
  dateTimeExpired?: Date;
};
