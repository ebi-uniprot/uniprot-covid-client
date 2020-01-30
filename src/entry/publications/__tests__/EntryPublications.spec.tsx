import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import EntryPublications from '../EntryPublications';
import publicationsData from '../__mocks__/entryPublicationsData.json';

let component;
const setSelectedFacets = jest.fn();

describe('EntryPublications tests', () => {
  beforeEach(() => {
    component = render(
      <Router>
        <EntryPublications
          accession="P05067"
          data={publicationsData.results}
          facets={publicationsData.facets}
          selectedFacets={[]}
          setSelectedFacets={setSelectedFacets}
          total={2388}
          handleLoadMoreItems={jest.fn()}
        />
      </Router>
    );
  });

  it('should render', () => {
    const { asFragment } = component;
    expect(asFragment()).toMatchSnapshot();
  });

  it('should toggle a filter', () => {
    const { getByText } = component;
    expect(setSelectedFacets).toHaveBeenCalledTimes(0);
    fireEvent.click(getByText(/Small/));
    expect(setSelectedFacets).toHaveBeenCalledTimes(1);
    fireEvent.click(getByText(/Small/));
    expect(setSelectedFacets).toHaveBeenCalledTimes(2);
  });
});
