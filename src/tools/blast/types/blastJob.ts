/* Job as defined inside the web application */

import { Status } from './blastStatuses';
import { BlastResults } from './blastResults';
import { FormParameters } from './blastFormParameters';

interface BaseJob {
  status: Status;
  internalID: string;
  title: string;
  type: 'blast';
  parameters: FormParameters;
  timeCreated: number;
  timeLastUpdate: number;
}

export interface CreatedJob extends BaseJob {
  status: Status.CREATED;
}

export interface FailedJob extends BaseJob {
  status: Status.FAILED;
  remoteID?: string; // depending on if it failed before or after submission
  timeSubmitted?: number; // depending on if it failed before or after submission
}

export interface RunningJob extends BaseJob {
  status: Status.RUNNING;
  remoteID: string;
  timeSubmitted: number;
}

// Data as BlastResults from './blastResults are not in here all the time to not
// fill the store with too much data
export interface FinishedJob extends BaseJob {
  status: Status.FINISHED;
  remoteID: string;
  timeSubmitted: number;
  timeFinished: number;
  data?: BlastResults;
}

export type Job = CreatedJob | FailedJob | RunningJob | FinishedJob;
