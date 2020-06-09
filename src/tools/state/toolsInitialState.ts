import { Job } from '../blast/types/blastJob';

export interface ToolsState {
  [key: string]: Job;
}

const toolsInitialState: ToolsState = {};

export default toolsInitialState;
