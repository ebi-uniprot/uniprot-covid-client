/* Job as defined inside the web application */

import { Status } from './blastStatuses';
import { BlastResults } from './blastResults';
import { FormParameters } from './blastFormParameters';

type BaseJob = {
  internalID: string;
  title: string;
  type: 'blast';
  parameters: FormParameters;
  timeCreated: number;
  timeLastUpdate: number;
};

export type CreatedJob = BaseJob & {
  status: Status.CREATED;
};

export type FailedJob = BaseJob & {
  status: Status.FAILED;
  remoteID?: string; // depending on if it failed before or after submission
  timeSubmitted?: number; // depending on if it failed before or after submission
};

export type RunningJob = BaseJob & {
  remoteID: string;
  status: Status.RUNNING;
  timeSubmitted: number;
};

// Data as BlastResults from './blastResults are not in here all the time to not
// fill the store with too much data
export type FinishedJob = RunningJob & {
  status: Status.FINISHED;
  timeFinished: number;
  data?: BlastResults;
};

export type Job = CreatedJob | FailedJob | RunningJob | FinishedJob;
