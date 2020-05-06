import React from 'react';
import renderWithRedux from '../../../../shared/__testHelpers__/renderWithRedux';
import UniProtKBEntryPublications from '../UniProtKBEntryPublications';
import entryData from '../../../__mockData__/entryModelData.json';
import entryInitialState from '../../../state/entryInitialState';

describe('UniProtKBEntryPublications', () => {
  it('Should render', () => {
    const { asFragment } = renderWithRedux(
      <UniProtKBEntryPublications pubmedIds={['12345']} />,
      {
        initialState: {
          entry: { ...entryInitialState, accession: 'P05067', data: entryData },
        },
      }
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
