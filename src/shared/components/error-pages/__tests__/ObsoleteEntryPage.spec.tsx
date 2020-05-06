import React from 'react';
import ObsoleteEntryPage from '../ObsoleteEntryPage';
import renderWithRedux from '../../../../shared/__testHelpers__/renderWithRedux';
import deletedEntryData from '../../../../shared/__mockData__/deletedEntryModelData.json';
import demergedEntryData from '../../../../shared/__mockData__/demergedEntryModelData.json';

describe('ObsoleteEntryPage component', () => {
  test('should render deleted page', () => {
    const { primaryAccession } = deletedEntryData;
    const { asFragment } = renderWithRedux(
      <ObsoleteEntryPage
        accession={primaryAccession}
        details={deletedEntryData.inactiveReason}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });

  test('should render demerged page', () => {
    const { primaryAccession } = demergedEntryData;
    const { asFragment } = renderWithRedux(
      <ObsoleteEntryPage
        accession={primaryAccession}
        details={demergedEntryData.inactiveReason}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
