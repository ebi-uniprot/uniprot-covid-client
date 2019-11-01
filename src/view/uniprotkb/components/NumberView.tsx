import { formatLargeNumber } from '../../../utils/utils';

export enum Unit {
  DA = 'Da',
  AA = 'AA',
}

const numberView = ({ value, unit }: { value?: number; unit?: Unit }): string =>
  value ? `${formatLargeNumber(value)}${unit ? ` ${unit}` : ''}` : '';

export default numberView;
