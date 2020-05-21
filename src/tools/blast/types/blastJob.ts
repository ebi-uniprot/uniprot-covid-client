/* Job as defined inside the web application */

import { Status } from './blastStatuses';
import { Parameters } from './blastParameters';
import { BlastResults } from './blastResults';

type BaseJob = {
  internalID: string;
  type: 'blast';
  parameters: Parameters;
  status: Status.CREATED;
  times: {
    created: number;
    lastUpdate: number;
  };
};

export type CreatedJob = BaseJob & {
  status: Status.CREATED;
};

export type FailedJob = BaseJob & {
  status: Status.FAILED;
  times: BaseJob['times'] & {
    submitted?: number; // depending on if it failed before or after submission
  };
};

export type RunningJob = CreatedJob & {
  remoteID: string;
  status: Status.RUNNING;
  times: BaseJob['times'] & {
    submitted: number;
  };
};

export type FinishedJob = RunningJob & {
  status: Status.FINISHED;
  times: RunningJob['times'] & {
    finished: number;
  };
  data: BlastResults;
};

export type Job =
  | CreatedJob
  | FailedJob
  | RunningJob
  | RunningJob
  | FinishedJob;
