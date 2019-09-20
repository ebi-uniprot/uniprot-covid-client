import createQueryString from '../QueryStringGenerator';
import {
  errorFreeTestData,
  errorThrowingTestData,
} from '../__fixtures__/clauseQueryTestData';

describe('QueryHelper', () => {
  errorFreeTestData.forEach(({ description, queryString, clauses }) => {
    test(description, () => {
      const testQueryString = createQueryString(clauses);
      expect(testQueryString).toBe(queryString);
    });
  });
  errorThrowingTestData.forEach(({ description, error, clauses }) => {
    test(description, () => {
      expect(() => {
        createQueryString(clauses);
      }).toThrow(error);
    });
  });
  // TODO databases
});
