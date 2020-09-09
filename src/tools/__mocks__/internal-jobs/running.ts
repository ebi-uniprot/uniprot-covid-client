import { RunningJob } from '../../types/toolsJob';
import { JobTypes } from '../../types/toolsJobTypes';
import { Status } from '../../types/toolsStatuses';

const now = Date.now();
const ONE_MINUTE_AGO = now - 1000 * 60;
const TWO_MINUTES_AGO = now - 1000 * 60 * 2;
const THREE_MINUTES_AGO = now - 1000 * 60 * 2;

const running: RunningJob = {
  status: Status.RUNNING,
  internalID: 'local-97e5ab00-9ff0-11ea-baf5-bf14c9060612',
  remoteID: 'ncbiblast-R20200522-953245-6299-98843150-p1m',
  title: 'my job title',
  type: JobTypes.BLAST,
  parameters: {
    program: 'blastp',
    stype: 'protein',
    sequence: 'MLPGLALLLL',
    database: 'uniprotkb_refprotswissprot',
    taxIDs: [],
    threshold: '1.0',
    matrix: 'BLOSUM50',
    filter: 'T',
    gapped: false,
    hits: 100,
  },
  timeCreated: THREE_MINUTES_AGO,
  timeSubmitted: TWO_MINUTES_AGO,
  timeLastUpdate: ONE_MINUTE_AGO,
  saved: false,
};

export default running;
