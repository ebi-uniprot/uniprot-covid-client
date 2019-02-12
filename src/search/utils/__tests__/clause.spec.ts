import { parseQueryString } from '../clause';
import { searchTerms } from '../../../data/searchTerms';
import { removeProperty } from '../../../utils/utils';
import testData from '../__fixtures__/clauseQueryTestData';

const removeId = clauses => clauses.map(clause => removeProperty(clause, 'id'));

describe('Clause utils: parse query string into clause(s)', () => {
  testData.forEach(({ description, queryString, clauses }) => {
    test(description, () => {
      const testClauses = parseQueryString(queryString, searchTerms);
      expect(removeId(testClauses)).toEqual(removeId(clauses));
    });
  });
});
