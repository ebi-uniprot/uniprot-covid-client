import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import EntryPublications from '../EntryPublications';
import mockPublicationsData from './__mocks__/entryPublicationsData.json';

jest.mock('../../../../shared/hooks/useDataApi', () => jest.fn());
import useDataApi from '../../../../shared/hooks/useDataApi';

describe('EntryPublications tests', () => {
  it('should call useDataApi and render', async () => {
    const headers = { 'x-totalrecords': mockPublicationsData.results.length };
    useDataApi.mockImplementation(() => {
      return {
        loading: false,
        data: mockPublicationsData,
        headers,
      };
    });
    const { findByText } = render(
      <Router>
        <EntryPublications accession="P05067" selectedFacets={[]} />
      </Router>
    );
    expect(useDataApi).toHaveBeenCalled();
    const item = await findByText(/ISOFORM APP751/);
    expect(item).toBeTruthy();
  });

  it('should render the error', async () => {
    useDataApi.mockImplementation(() => {
      return {
        loading: false,
        error: new Error('my error'),
        status: 400,
      };
    });
    const { asFragment } = render(
      <Router>
        <EntryPublications accession="P05067" selectedFacets={[]} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
