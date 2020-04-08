export enum Level {
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  INFO = 'INFO',
  SUCCESS = 'SUCCESS',
}

export enum Format {
  POP_UP = 'POP_UP', // eg pops up as a small rectangle at the top right of the page
  IN_PAGE = 'IN_PAGE', // eg full width banner at the top of the page
  FULL_PAGE = 'FULL_PAGE', // eg graphic indicating no results found
}

export type Message = {
  id?: string;
  content: string | JSX.Element;
  format: Format;
  level: Level;
  dateTimeActive?: Date;
  dateTimeExpired?: Date;
};
