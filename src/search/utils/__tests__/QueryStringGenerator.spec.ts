import {
  createQueryString,
  createFacetsQueryString,
} from '../QueryStringGenerator';
import testData from '../__testData__/clauseQueryTestData';

describe('QueryHelper', () => {
  Object.keys(testData).forEach(key => {
    const { description, queryString, clauses } = testData[key];
    test(description, () => {
      const queryString = createQueryString(clauses);
      expect(queryString).toBe(queryString);
    });
  });
  // TODO databases
});
