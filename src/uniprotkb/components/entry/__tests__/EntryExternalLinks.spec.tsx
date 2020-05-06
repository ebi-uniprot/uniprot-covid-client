import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import EntryExternalLinks from '../EntryExternalLinks';
import uniProtKbConverter from '../../../adapters/UniProtkbConverter';
import mockData from '../../../__mockData__/entryModelData.json';

describe('Entry - External Links view', () => {
  test('should render', () => {
    const { asFragment } = render(
      <Router>
        <EntryExternalLinks transformedData={uniProtKbConverter(mockData)} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
