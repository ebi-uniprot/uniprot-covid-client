/* Job as defined inside the web application */

import { Status } from './blastStatuses';
import { Parameters } from './blastParameters';
import { BlastResults } from './blastResults';

type BaseJob = {
  internalID: string;
  title: string;
  type: 'blast';
  parameters: Parameters;
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

export type RunningJob = BaseJob & {
  remoteID: string;
  status: Status.RUNNING;
  times: BaseJob['times'] & {
    submitted: number;
  };
};

// Data as BlastResults from './blastResults are not in here all the time to not
// fill the store with too much data
export type FinishedJob = RunningJob & {
  status: Status.FINISHED;
  times: RunningJob['times'] & {
    finished: number;
  };
  data?: BlastResults;
};

export type Job = CreatedJob | FailedJob | RunningJob | FinishedJob;
