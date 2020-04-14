export enum MessageLevel {
  SUCCESS = 'SUCCESS',
  INFO = 'INFO',
  WARNING = 'WARNING',
  FAILURE = 'FAILURE',
}

export enum MessageFormat {
  POP_UP = 'POP_UP', // eg pops up at the bottom right of the page
  IN_PAGE = 'IN_PAGE', // eg full width banner at the top of the page
}

export type MessageType = {
  id: string;
  content: string | JSX.Element;
  format: MessageFormat;
  level: MessageLevel;
  dateActive?: number;
  dateExpired?: number;
  tag?: string;
};
