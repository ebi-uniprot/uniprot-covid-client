import { v1 } from 'uuid';

const createEmptyClause = () => ({
  id: v1(),
  logicOperator: 'AND',
  field: {
    label: 'Any',
    term: 'All',
    example: 'a4_human, P05067, cdc7 human',
    itemType: 'single',
    dataType: 'string',
    id: 'id_Any',
  },
  queryInput: {},
});

export default createEmptyClause;