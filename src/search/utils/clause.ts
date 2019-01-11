import { v1 } from 'uuid';
import { serializableDeepAreEqual, removeProperty } from '../../utils/utils';
import { Operator, Input } from '../types/searchTypes';

type Clause = {
  id: string;
  logicOperator: Operator;
  field: {
    label: string;
    term: string;
    example: string;
    itemType: string; // TODO should be enum?
    dataType: string; // TODO should be enum?
    id: string;
  };
  queryInput: Input;
};

export const createEmptyClause = (): Clause => ({
  id: v1(),
  logicOperator: Operator.AND,
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

export const clausesAreEqual = (clause1: Clause, clause2: Clause) => serializableDeepAreEqual(removeProperty(clause1, 'id'), removeProperty(clause2, 'id'));
