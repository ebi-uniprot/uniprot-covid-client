export type BlastJob = {
  jobId: string;
  status?: string;
  results?: any[];
};

export type BlastState = {
  jobs: BlastJob[];
};

const blastInitialState: BlastState = {
  jobs: [],
};

export default blastInitialState;
