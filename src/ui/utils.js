import { v1 } from 'uuid';

const createEmptyField = () => ({
  id: v1(),
  logic: 'AND',
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

export default createEmptyField;
