import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import EntryExternalLinks from '../EntryExternalLinks';
import uniProtKbConverter from '../../model/uniprotkb/UniProtkbConverter';
import mock_data from '../../model/__mocks__/entryModelData.json';

describe('Entry - External Links view', () => {
  test('should render', () => {
    const { asFragment } = render(
      <Router>
        <EntryExternalLinks transformedData={uniProtKbConverter(mock_data)} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
