import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import EntryPublicationsFacets from '../EntryPublicationsFacets';
import mockPublicationsData from './__mocks__/entryPublicationsData.json';

jest.mock('../../../../shared/hooks/useDataApi', () => ({
  __esModule: true, // this makes it work
  default: jest.fn(() => ({
    loading: false,
    data: mockPublicationsData,
  })),
}));

let component;
const setSelectedFacets = jest.fn();
const selectedFacets = [{ name: 'study_type', value: 'large_scale' }];

describe('EntryPublication facets tests', () => {
  beforeEach(() => {
    component = render(
      <Router>
        <EntryPublicationsFacets
          accession="P05067"
          selectedFacets={selectedFacets}
          setSelectedFacets={setSelectedFacets}
        />
      </Router>
    );
  });

  it('should render', () => {
    const { asFragment } = component;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should add facet', () => {
    const { getByText } = component;
    fireEvent.click(getByText(/Small/));
    expect(setSelectedFacets).toHaveBeenCalledTimes(1);
  });

  it('should remove facet', () => {
    const { getByText } = component;
    fireEvent.click(getByText(/Large/));
    expect(setSelectedFacets).toHaveBeenCalledTimes(2);
  });
});
