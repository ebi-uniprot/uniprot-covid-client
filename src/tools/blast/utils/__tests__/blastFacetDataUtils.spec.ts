import { filterBlastDatum } from '../blastFacetDataUtils';

describe('filterBlastDatum', () => {
  const datapoint = {
    score: 100,
    identity: 10,
    evalue: 1,
  };

  it('should return all datapoint attributes when no filters are applied', () => {
    const rangeFilters = {};
    expect(filterBlastDatum(datapoint, rangeFilters)).toEqual({
      score: 100,
      identity: 10,
      evalue: 1,
    });
  });

  it('should return all datapoint attributes when single (and active) range filter within range', () => {
    const rangeFilters = {
      score: [85, 150],
    };
    const activeFacet = 'score';
    expect(filterBlastDatum(datapoint, rangeFilters, activeFacet)).toEqual({
      score: 100,
      identity: 10,
      evalue: 1,
    });
  });

  it('should return only active facet value when single (and active) range filter is outside of range', () => {
    const rangeFilters = {
      score: [200, 300],
    };
    const activeFacet = 'score';
    expect(filterBlastDatum(datapoint, rangeFilters, activeFacet)).toEqual({
      score: 100,
    });
  });

  it('should return an empty object when two range filters applied and the inactive range filter is out of range', () => {
    const rangeFilters = {
      score: [50, 150],
      identity: [20, 30],
    };
    const activeFacet = 'score';
    expect(filterBlastDatum(datapoint, rangeFilters, activeFacet)).toEqual({});
  });

  it('should return only active facet value when active range filter is outside of range and an inactive range filter is within range', () => {
    const rangeFilters = {
      score: [10, 200],
      identity: [95, 100],
    };
    const activeFacet = 'identity';
    expect(filterBlastDatum(datapoint, rangeFilters, activeFacet)).toEqual({
      identity: 10,
    });
  });
});
