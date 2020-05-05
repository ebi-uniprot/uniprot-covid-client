import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import UniProtKBEntryPublications from '../UniProtKBEntryPublications';
import { render } from '@testing-library/react';
import { getPublicationsURL } from '../../apiUrls';
import mockUniProtKBEntryPublications from './__mockData__/uniprotKBEntryPublications.json';

import useDataApi from '../../../hooks/useDataApi';
jest.mock('../../../hooks/useDataApi', () => jest.fn());

describe('UniProtKBEntryPublications', () => {
  it('Should make a call with pubmed ids and render properly', () => {
    useDataApi.mockImplementation(() => ({
      loading: false,
      data: mockUniProtKBEntryPublications,
    }));
    const pubMedIds = ['123', '456'];
    const { asFragment } = render(
      <Router>
        <UniProtKBEntryPublications pubmedIds={pubMedIds} />
      </Router>
    );
    expect(useDataApi).toHaveBeenCalledWith(getPublicationsURL(pubMedIds));
    expect(asFragment()).toMatchSnapshot();
  });

  it('Should make a call with pubmed ids', () => {
    useDataApi.mockImplementation(() => ({
      error: {
        message: 'There has been an error',
      },
    }));
    const pubMedIds = ['123', '456'];
    const { asFragment } = render(
      <Router>
        <UniProtKBEntryPublications pubmedIds={pubMedIds} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
