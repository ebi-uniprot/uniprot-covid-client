import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import EntryMain from '../EntryMain';
import uniProtKbConverter from '../../model/uniprotkb/UniProtkbConverter';
import mock_data from '../../model/__mocks__/modelData.json';

describe('Entry view', () => {
  test('should render', () => {
    const { asFragment } = render(
      <Router>
        <EntryMain transformedData={uniProtKbConverter(mock_data)} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
