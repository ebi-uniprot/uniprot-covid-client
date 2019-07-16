import React from 'react';
import { render, cleanup } from '@testing-library/react';
import VariationView from '../VariationView';

afterEach(cleanup);

describe('VariationView component', () => {
  test('it renders without crashing', () => {
    const { asFragment } = render(<VariationView accession="P05067" />);
    expect(asFragment()).toMatchSnapshot();
  });
});
