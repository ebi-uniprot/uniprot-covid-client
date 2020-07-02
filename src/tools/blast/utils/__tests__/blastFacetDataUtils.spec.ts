import {
  filterBlastHitForFacets,
  getFacetParametersFromBlastHits,
} from '../blastFacetDataUtils';
import { SelectedFacet } from '../../types/blastResults';

describe('filterBlastHitForFacets', () => {
  const datapoint = {
    score: 100,
    identity: 10,
    evalue: 1,
  };

  it('should return all datapoint attributes when no filters are applied', () => {
    const rangeFilters = {};
    expect(filterBlastHitForFacets(datapoint, rangeFilters)).toEqual({
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
    expect(
      filterBlastHitForFacets(datapoint, rangeFilters, activeFacet)
    ).toEqual({
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
    expect(
      filterBlastHitForFacets(datapoint, rangeFilters, activeFacet)
    ).toEqual({
      score: 100,
    });
  });

  it('should return an empty object when two range filters applied and the inactive range filter is out of range', () => {
    const rangeFilters = {
      score: [50, 150],
      identity: [20, 30],
    };
    const activeFacet = 'score';
    expect(
      filterBlastHitForFacets(datapoint, rangeFilters, activeFacet)
    ).toEqual({});
  });

  it('should return only active facet value when active range filter is outside of range and an inactive range filter is within range', () => {
    const rangeFilters = {
      score: [10, 200],
      identity: [95, 100],
    };
    const activeFacet = 'identity';
    expect(
      filterBlastHitForFacets(datapoint, rangeFilters, activeFacet)
    ).toEqual({
      identity: 10,
    });
  });
});

describe('getFacetParametersFromBlastHits', () => {
  const selectedFacetsEmpty = [];

  const selectedFacetsOne: SelectedFacet[] = [
    {
      name: 'score',
      value: '0-99',
    },
  ];

  const selectedFacetsTwo: SelectedFacet[] = [
    {
      name: 'score',
      value: '0-101',
    },
    {
      name: 'identity',
      value: '0-12',
    },
  ];

  const blastHits = [
    {
      hit_hsps: [
        { hsp_score: 100, hsp_identity: 10, hsp_expect: 0.1 },
        { hsp_score: 101, hsp_identity: 11, hsp_expect: 0.2 },
        { hsp_score: 102, hsp_identity: 12, hsp_expect: 0.3 },
      ],
    },
  ];

  const blastHitsAllValues = {
    score: {
      values: [100, 101, 102],
      min: 100,
      max: 102,
    },
    identity: {
      values: [10, 11, 12],
      min: 10,
      max: 12,
    },
    evalue: {
      values: [0.1, 0.2, 0.3],
      min: 0.1,
      max: 0.3,
    },
  };

  it('should return all if no facets have been set', () => {
    const results = getFacetParametersFromBlastHits(
      selectedFacetsEmpty,
      '',
      blastHits
    );

    expect(results).toEqual(blastHitsAllValues);
  });

  it('should return all values for active facet, regardless of facet value', () => {
    const results = getFacetParametersFromBlastHits(
      selectedFacetsOne,
      'score',
      blastHits
    );

    expect(results).toEqual({
      score: {
        values: [100, 101, 102],
        min: 100,
        max: 102,
      },
      identity: {
        values: [],
        min: 10,
        max: 12,
      },
      evalue: {
        values: [],
        min: 0.1,
        max: 0.3,
      },
    });
  });

  it('should return only in-range values, when facet is not active', () => {
    const results = getFacetParametersFromBlastHits(
      selectedFacetsTwo,
      'identity',
      blastHits
    );

    expect(results).toEqual({
      score: {
        values: [100, 101],
        min: 100,
        max: 102,
      },
      identity: {
        values: [10, 11],
        min: 10,
        max: 12,
      },
      evalue: {
        values: [0.1, 0.2],
        min: 0.1,
        max: 0.3,
      },
    });
  });
});
