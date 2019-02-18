import { createQueryString } from '../QueryStringGenerator';
import testData from '../__fixtures__/clauseQueryTestData';

describe('QueryHelper', () => {
  testData.forEach(({ description, queryString, clauses }) => {
    test(description, () => {
      const testQueryString = createQueryString(clauses);
      expect(testQueryString).toBe(queryString);
    });
  });
  // TODO databases
});
