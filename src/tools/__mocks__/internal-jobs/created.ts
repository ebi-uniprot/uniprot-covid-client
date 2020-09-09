import { CreatedJob } from '../../types/toolsJob';
import { JobTypes } from '../../types/toolsJobTypes';
import { Status } from '../../types/toolsStatuses';

const ONE_MINUTE_AGO = Date.now() - 1000 * 60;

const created: CreatedJob = {
  status: Status.CREATED,
  internalID: 'local-97e5ab00-9ff0-11ea-baf5-bf14c0760612',
  title: 'my job title',
  type: JobTypes.BLAST,
  parameters: {
    stype: 'protein',
    sequence: 'MLPGLALLLL',
    program: 'blastp',
    database: 'uniprotkb_refprotswissprot',
    taxIDs: [],
    threshold: '1e-2',
    matrix: 'BLOSUM62',
    filter: 'T',
    gapped: true,
    hits: 20,
  },
  timeCreated: ONE_MINUTE_AGO,
  timeLastUpdate: ONE_MINUTE_AGO,
  saved: false,
};

export default created;
