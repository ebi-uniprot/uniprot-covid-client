import { formatLargeNumber } from '../../../shared/utils/utils';

export enum Unit {
  DA = 'Da',
  AA = 'AA',
}

const numberView = ({ value, unit }: { value?: number; unit?: Unit }): string =>
  typeof value !== 'undefined'
    ? `${formatLargeNumber(value)}${unit ? ` ${unit}` : ''}`
    : '';

export default numberView;
