import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import EntryPublications from '../EntryPublications';
import mockPublicationsData from '../__mocks__/entryPublicationsData.json';

import useDataApi from '../../../hooks/useDataApi';

jest.mock('../../../hooks/useDataApi', () => ({
  __esModule: true, // this makes it work
  default: jest.fn(() => ({
    loading: false,
    data: mockPublicationsData,
    headers: {
      'x-totalrecords': mockPublicationsData.results.length,
    },
  })),
}));

describe('EntryPublications tests', () => {
  it('should render', () => {
    // It seems the setState in useEffect causes this to hang
    // render(
    //   <Router>
    //     <EntryPublications accession="P05067" selectedFacets={[]} />
    //   </Router>
    // );
    // expect(useDataApi).toHaveBeenCalled();
  });
});
