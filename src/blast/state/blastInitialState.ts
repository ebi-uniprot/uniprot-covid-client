import { BlastResults } from '../types/blastResults';

export type BlastJob = {
  jobId: string;
  results?: BlastResults[];
};

export type BlastState = {
  jobs: BlastJob[];
};

const blastInitialState: BlastState = {
  jobs: [],
};

export default blastInitialState;
