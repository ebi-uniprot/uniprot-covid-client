import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import UniProtCard from '../UniProtCard';
import data from '../../../../model/__mocks__/entryModelData.json';

const handleEntrySelection = jest.fn();

let item;

describe('UniProtCard component', () => {
  beforeEach(() => {
    item = render(
      <Router>
        <UniProtCard
          data={data}
          selectedEntries={{}}
          handleEntrySelection={handleEntrySelection}
        />
      </Router>
    );
  });

  test('should render', () => {
    const { asFragment } = item;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should select a row', () => {
    const { getByTestId } = item;
    const checkbox = getByTestId('up-card-checkbox');
    fireEvent.click(checkbox);
    expect(handleEntrySelection).toHaveBeenCalled();
  });
});
