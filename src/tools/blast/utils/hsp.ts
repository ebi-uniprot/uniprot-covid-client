/* eslint-disable camelcase */
import { BlastHsp } from '../types/blastResults';
import { findSequenceSegments } from '../../utils';
import { ProcessedFeature } from '../../../uniprotkb/components/protein-data-views/FeaturesView';

export const getFullAlignmentLength = (
  hsp: BlastHsp,
  queryLength: number,
  hitLength: number
) => {
  const {
    hsp_hit_from,
    hsp_query_from,
    hsp_query_to,
    hsp_hit_to,
    hsp_align_len,
  } = hsp;

  /**
   * prefix|align|suffix
   *     --|=====|-----
   * ------|=====|---------
   */
  const prefix = hsp_query_from > hsp_hit_from ? hsp_query_from : hsp_hit_from;
  const suffix =
    queryLength - hsp_query_to > hitLength - hsp_hit_to
      ? queryLength - hsp_query_to
      : hitLength - hsp_hit_to;
  return prefix - 1 + hsp_align_len + suffix;
};

export const getOffset = ({ hsp_hit_from, hsp_query_from }: BlastHsp) =>
  hsp_hit_from > hsp_query_from ? hsp_hit_from : hsp_query_from;

export const getFullAlignmentSegments = (
  hsp: BlastHsp,
  queryLength: number,
  hitLength: number
) => {
  // franklin $colour-sapphire-blue
  const colour = '#014371';

  const {
    hsp_hit_from,
    hsp_query_from,
    hsp_qseq,
    hsp_identity,
    hsp_hseq,
    hsp_query_to,
    hsp_hit_to,
  } = hsp;
  const opacity = hsp_identity / 100;

  const countGaps = (seq: string) => {
    const matches = seq.match(/-/g);
    return matches ? matches.length : 0;
  };

  const offsets = {
    queryPrefix:
      hsp_hit_from - hsp_query_from > 0 ? hsp_hit_from - hsp_query_from : 0,
    hitPrefix:
      hsp_query_from - hsp_hit_from > 0 ? hsp_query_from - hsp_hit_from : 0,
  };

  const querySegments = findSequenceSegments(hsp_qseq);
  const hitSegments = findSequenceSegments(hsp_hseq);

  return {
    querySegments: [
      {
        start: offsets.queryPrefix === 0 ? 1 : offsets.queryPrefix,
        end: offsets.queryPrefix + hsp_query_from,
        shape: 'line',
        color: colour,
        opacity,
      },
      ...querySegments.map(([start, end]) => ({
        start: offsets.queryPrefix + (hsp_query_from - 1) + start,
        end: offsets.queryPrefix + (hsp_query_from - 1) + end,
        color: colour,
        opacity,
      })),
      {
        start: offsets.queryPrefix + hsp_query_to + countGaps(hsp_qseq),
        end: offsets.queryPrefix + queryLength + countGaps(hsp_qseq),
        shape: 'line',
        color: colour,
        opacity,
      },
    ],
    hitSegments: [
      {
        start: offsets.hitPrefix === 0 ? 1 : offsets.hitPrefix,
        end: offsets.hitPrefix + hsp_hit_from,
        shape: 'line',
        color: colour,
        opacity,
      },
      ...hitSegments.map(([start, end]) => ({
        start: offsets.hitPrefix + (hsp_hit_from - 1) + start,
        end: offsets.hitPrefix + (hsp_hit_from - 1) + end,
        color: colour,
        opacity,
      })),
      {
        start: offsets.hitPrefix + hsp_hit_to + countGaps(hsp_hseq),
        end: offsets.hitPrefix + hitLength + countGaps(hsp_hseq),
        shape: 'line',
        color: colour,
        opacity,
      },
    ],
  };
};

export const transformFeaturesPositions = (features: ProcessedFeature[]) =>
  features.map((feature) => ({
    ...feature,
    start: feature.start - 1,
    end: feature.end - 1,
  }));
