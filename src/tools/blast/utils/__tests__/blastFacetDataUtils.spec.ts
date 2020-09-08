import {
  filterBlastDataForResults,
  getDataPoints,
  getBounds,
  getFacetBounds,
} from '../blastFacetDataUtils';

const a = { hit_hsps: [{ hsp_score: 100, hsp_identity: 10, hsp_expect: 0.1 }] };
const b = { hit_hsps: [{ hsp_score: 102, hsp_identity: 11, hsp_expect: 0.2 }] };
const c = {
  hit_hsps: [
    { hsp_score: 101, hsp_identity: 12, hsp_expect: 0.3 },
    { hsp_score: 105, hsp_identity: 12, hsp_expect: 0.3 },
  ],
};
const blastHits = [a, b, c];

describe('filterBlastDataForResults', () => {
  it('should filter hits by score facet', () => {
    const facet = [
      {
        name: 'score',
        value: '[100 TO 101]',
      },
    ];
    expect(filterBlastDataForResults({ hits: blastHits }, facet)).toEqual({
      hits: [a, c],
      alignments: 2,
    });
  });

  it('should filter hits by score AND identity facet', () => {
    const facet = [
      {
        name: 'score',
        value: '[100 TO 101]',
      },
      {
        name: 'identity',
        value: '[10 TO 10]',
      },
    ];
    expect(filterBlastDataForResults({ hits: blastHits }, facet)).toEqual({
      hits: [a],
      alignments: 1,
    });
  });
});

describe('getDataPoints', () => {
  it('should extract the data points', () => {
    expect(getDataPoints(blastHits)).toEqual({
      score: [100, 102, 101, 105],
      identity: [10, 11, 12, 12],
      evalue: [0.1, 0.2, 0.3, 0.3],
    });
  });
});

describe('getBounds', () => {
  it('should extract the data bounds', () => {
    expect(getBounds(blastHits)).toEqual({
      score: { min: 100, max: 105 },
      identity: { min: 10, max: 12 },
      evalue: { min: 0.1, max: 0.3 },
    });
  });
});

describe('getFacetBounds', () => {
  it('should extract the facet bounds', () => {
    expect(
      getFacetBounds([
        {
          name: 'score',
          value: '[100 TO 101]',
        },
        {
          name: 'identity',
          value: '[10 TO 10]',
        },
      ])
    ).toEqual({
      score: { min: 100, max: 101 },
      identity: { min: 10, max: 10 },
      evalue: { min: -Infinity, max: +Infinity },
    });
  });

  it('should extract the facet bounds with *', () => {
    expect(
      getFacetBounds([
        {
          name: 'score',
          value: '[* TO 101]',
        },
        {
          name: 'identity',
          value: '[10 TO *]',
        },
      ])
    ).toEqual({
      score: { min: -Infinity, max: 101 },
      identity: { min: 10, max: +Infinity },
      evalue: { min: -Infinity, max: +Infinity },
    });
  });

  it('should extract the facet bounds and ignore non-local facets', () => {
    expect(
      getFacetBounds([
        {
          name: 'reviewed',
          value: 'true',
        },
        {
          name: 'identity',
          value: '[10 TO *]',
        },
      ])
    ).toEqual({
      score: { min: -Infinity, max: +Infinity },
      identity: { min: 10, max: +Infinity },
      evalue: { min: -Infinity, max: +Infinity },
    });
  });
});
