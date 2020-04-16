export enum MessageLevel {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  FAILURE = 'failure',
}

export enum MessageFormat {
  POP_UP = 'POP_UP', // eg pops up at the bottom right of the page
  IN_PAGE = 'IN_PAGE', // eg full width banner at the top of the page
}

export enum MessageTag {
  BLAST_JOB = 'BLAST_JOB',
  DOWNTIME = 'DOWNTIME',
}

export type MessageType = {
  id: string;
  content: string | JSX.Element;
  format: MessageFormat;
  level: MessageLevel;
  dateActive?: number;
  dateExpired?: number;
  tag?: MessageTag;
};
