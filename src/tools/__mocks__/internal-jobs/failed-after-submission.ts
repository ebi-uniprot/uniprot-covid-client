import { FailedJob } from '../../types/toolsJob';
import { JobTypes } from '../../types/toolsJobTypes';
import { Status } from '../../types/toolsStatuses';

const now = Date.now();
const ONE_MINUTE_AGO = now - 1000 * 60;
const TWO_MINUTES_AGO = now - 1000 * 60 * 2;

const failedBeforeSubmission: FailedJob = {
  status: Status.FAILURE,
  internalID: 'local-97e5ab00-9ff0-11ea-baf5-bf14c0760620',
  title: 'my job title',
  type: JobTypes.BLAST,
  parameters: {
    stype: 'protein',
    sequence: 'MLPGLALLLL',
    program: 'blastp',
    database: 'uniprotkb_refprotswissprot',
    taxIDs: [{ id: '9606', label: 'Homo sapiens' }],
    threshold: '10',
    matrix: 'BLOSUM62',
    filter: 'F',
    gapped: false,
    hits: 50,
  },
  timeCreated: TWO_MINUTES_AGO,
  timeLastUpdate: ONE_MINUTE_AGO,
  saved: false,
};

export default failedBeforeSubmission;
