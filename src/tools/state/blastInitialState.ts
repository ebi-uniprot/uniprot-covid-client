import { BlastResults } from '../blast/types/blastResults';

export type BlastJob = {
  jobId: string;
  data?: BlastResults;
};

export type BlastState = {
  jobs: BlastJob[];
};

const blastInitialState: BlastState = {
  jobs: [],
};

export default blastInitialState;
