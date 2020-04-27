import React from 'react';
import ObsoleteEntryPage from '../ObsoleteEntryPage';
import renderWithRedux from '../../../__testHelpers__/renderWithRedux';
import deletedEntryData from '../../../model/__mocks__/deletedEntryModelData.json';
import demergedEntryData from '../../../model/__mocks__/demergedEntryModelData.json';

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
