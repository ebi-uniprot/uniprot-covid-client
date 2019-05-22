import React from 'react';
import { render } from 'react-testing-library';
import GeneNamesView from '../GeneNamesView';
import GeneNamesUIDataJson from '../__mocks__/GeneNamesUIData.json';

describe('GeneNames', () => {
  test('should render gene_names', () => {
    const { asFragment } = render(<GeneNamesView {...GeneNamesUIDataJson} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
