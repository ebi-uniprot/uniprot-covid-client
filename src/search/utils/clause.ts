import { v1 } from 'uuid';
import { serializableDeepAreEqual, removeProperty } from '../../utils/utils';
import { Operator, Input, SearchTermType } from '../types/searchTypes';

enum itemType {
  comment = 'comment',
  database = 'database',
  feature = 'feature',
  goterm = 'goterm',
  group = 'group',
  groupDisplay = 'groupDisplay',
  single = 'single',
}

enum dataType {
  empty = '',
  date = 'date',
  enum = 'enum',
  integer = 'integer',
  string = 'string',
}

type Clause = {
  id: string;
  logicOperator: Operator;
  searchTerm: {
    label: string;
    term: string;
    example: string;
    itemType: itemType;
    dataType: dataType;
    id: string;
  };
  queryInput: Input;
};

export const createEmptyClause = (): Clause => ({
  id: v1(),
  logicOperator: Operator.AND,
  searchTerm: {
    label: 'All',
    term: 'All',
    example: 'a4_human, P05067, cdc7 human',
    itemType: itemType.single,
    dataType: dataType.string,
    id: 'id_all',
  },
  queryInput: {},
});

export const clausesAreEqual = (clause1: Clause, clause2: Clause) =>
  serializableDeepAreEqual(
    removeProperty(clause1, 'id'),
    removeProperty(clause2, 'id')
  );
