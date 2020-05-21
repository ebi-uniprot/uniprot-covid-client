import { Job } from '../blast/types/blastJob';

export interface BlastState {
  [key: string]: Job;
}

const blastInitialState: BlastState = {};

export default blastInitialState;
