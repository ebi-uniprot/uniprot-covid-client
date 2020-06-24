import React, { FC } from 'react';
import { flatten } from 'lodash-es';
import { Histogram } from 'franklin-sites';
import { BlastHit } from '../../types/blastResults';
import {
  getSmallerMultiple,
  getLargerMultiple,
} from '../../../../shared/utils/utils';
import '../styles/BlastResultHitDistribution.scss';

type Props = {
  hits: BlastHit[];
  binSize: number;
};

const BlastResultHitDistribution: FC<Props> = ({ hits, binSize }) => {
  const scores = flatten(
    hits.map((hit) => hit.hit_hsps.map((hsp) => hsp.hsp_score))
  );
  const min = getSmallerMultiple(Math.min(...scores), binSize);
  const max = getLargerMultiple(Math.max(...scores), binSize);
  return (
    <div className="blast-result-hit-distribution">
      <Histogram
        values={scores}
        binSize={binSize}
        min={min}
        max={max}
        xLabel="Score"
        yLabel="Hits"
      />
    </div>
  );
};

export default BlastResultHitDistribution;
