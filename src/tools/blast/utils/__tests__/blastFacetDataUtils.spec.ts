import {
  filterBlastHitForFacets,
  ParsedBlastFacets,
} from '../blastFacetDataUtils';
import { BlastFacet } from '../../types/blastResults';

describe('filterBlastHitForFacets', () => {
  const datapoint = {
    score: 100,
    identity: 10,
    evalue: 1,
  };

  it('should return all datapoint attributes when no filters are applied', () => {
    const rangeFilters: ParsedBlastFacets = {};
    expect(filterBlastHitForFacets(datapoint, rangeFilters)).toEqual({
      score: 100,
      identity: 10,
      evalue: 1,
    });
  });

  it('should return all datapoint attributes when single (and active) range filter within range', () => {
    const rangeFilters: ParsedBlastFacets = {
      score: [85, 150],
    };
    const activeFacet = BlastFacet.SCORE;
    expect(
      filterBlastHitForFacets(datapoint, rangeFilters, activeFacet)
    ).toEqual({
      score: 100,
      identity: 10,
      evalue: 1,
    });
  });

  it('should return only active facet value when single (and active) range filter is outside of range', () => {
    const rangeFilters: ParsedBlastFacets = {
      score: [200, 300],
    };
    const activeFacet = BlastFacet.SCORE;
    expect(
      filterBlastHitForFacets(datapoint, rangeFilters, activeFacet)
    ).toEqual({
      score: 100,
    });
  });

  it('should return an empty object when two range filters applied and the inactive range filter is out of range', () => {
    const rangeFilters: ParsedBlastFacets = {
      score: [50, 150],
      identity: [20, 30],
    };
    const activeFacet = BlastFacet.SCORE;
    expect(
      filterBlastHitForFacets(datapoint, rangeFilters, activeFacet)
    ).toEqual({});
  });

  it('should return only active facet value when active range filter is outside of range and an inactive range filter is within range', () => {
    const rangeFilters: ParsedBlastFacets = {
      score: [10, 200],
      identity: [95, 100],
    };
    const activeFacet = BlastFacet.IDENTITY;
    expect(
      filterBlastHitForFacets(datapoint, rangeFilters, activeFacet)
    ).toEqual({
      identity: 10,
    });
  });
});
