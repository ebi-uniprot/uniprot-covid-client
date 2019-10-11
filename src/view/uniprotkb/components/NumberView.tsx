import React, { FC } from 'react';
import { formatLargeNumber } from '../../../utils/utils';

export enum Unit {
  DA = 'Da',
  AA = 'AA',
}

const NumberView: FC<{ value: number; unit?: Unit }> = ({ value, unit }) => (
  <span className="number">
    {formatLargeNumber(value)}
    {unit && ` ${unit}`}
  </span>
);

export default NumberView;
