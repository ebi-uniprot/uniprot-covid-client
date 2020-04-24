import React from 'react';
import ObsoleteEntryPage from '../ObsoleteEntryPage';
import renderWithRedux from '../../../__testHelpers__/renderWithRedux';
import deletedEntryData from '../../../model/__mocks__/deletedEntryModelData.json';
import demeregedEntryData from '../../../model/__mocks__/demergedEntryModelData.json';

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

  test('should render demereged page', () => {
    const { primaryAccession } = demeregedEntryData;
    const { asFragment } = renderWithRedux(
      <ObsoleteEntryPage
        accession={primaryAccession}
        details={demeregedEntryData.inactiveReason}
      />
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
