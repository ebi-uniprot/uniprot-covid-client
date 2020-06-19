import React, { FC } from 'react';
import { flatten } from 'lodash-es';
import { Histogram } from 'franklin-sites';
import { BlastHit } from '../../types/blastResults';
import '../styles/BlastResultHitDistribution.scss';

const BlastResultHitDistribution: FC<{ hits: BlastHit[] }> = ({ hits }) => {
  const scores = flatten(
    hits.map((hit) => hit.hit_hsps.map((hsp) => hsp.hsp_score))
  );
  const binSize = 100;
  const min = Math.min(...scores);
  const max = Math.max(...scores);
  return (
    <div className="blast-result-hit-distribution">
      <Histogram
        values={scores}
        binSize={binSize}
        min={Math.floor(min / binSize) * binSize}
        max={Math.ceil(max / binSize) * binSize}
      />
    </div>
  );
};

export default BlastResultHitDistribution;
