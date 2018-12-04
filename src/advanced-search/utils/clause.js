import { v1 } from 'uuid';
import { serializableDeepAreEqual, removeProperty } from '../../utils/utils';

export const createEmptyClause = () => ({
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

// export const isClauseTouched = (clause) => {
//   const empty = createEmptyClause();
//   const emptyWithoutID = removeProperty(empty, 'id');
//   const clauseWithoutID = removeProperty(clause, 'id');
//   return !serializableDeepEquals(emptyWithoutID, clauseWithoutID);
// };

export const clausesAreEqual = (clause1, clause2) => serializableDeepAreEqual(removeProperty(clause1, 'id'), removeProperty(clause2, 'id'));
