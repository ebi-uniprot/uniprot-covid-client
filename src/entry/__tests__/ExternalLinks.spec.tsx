import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import ExternalLinks from '../ExternalLinks';
import uniProtKbConverter from '../../model/uniprotkb/UniProtkbConverter';
import mock_data from '../../model/__mocks__/modelData.json';

describe('Entry - External Links view', () => {
  test('should render', () => {
    const { asFragment } = render(
      <Router>
        <ExternalLinks transformedData={uniProtKbConverter(mock_data)} />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
