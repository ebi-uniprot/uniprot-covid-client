import React from 'react';
import GeneNamesView from '../GeneNamesView';
import renderWithRedux from '../../../../__testHelpers__/renderWithRedux';
import GeneNamesUIDataJson from '../__mocks__/GeneNamesUIData.json';

describe('GeneNames', () => {
  test('should render gene_names', () => {
    const { asFragment } = renderWithRedux(
      <GeneNamesView geneNamesData={GeneNamesUIDataJson} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
