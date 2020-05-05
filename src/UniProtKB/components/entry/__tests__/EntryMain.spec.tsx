import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import EntryMain from '../EntryMain';
import uniProtKbConverter from '../../model/uniprotkb/UniProtkbConverter';
import mock_data from '../../model/__mocks__/entryModelData.json';
import { act } from 'react-dom/test-utils';
import renderWithRedux from '../../__testHelpers__/renderWithRedux';

describe('Entry view', () => {
  test('should render', async () => {
    await act(async () => {
      const { asFragment } = renderWithRedux(
        <Router>
          <EntryMain transformedData={uniProtKbConverter(mock_data)} />
        </Router>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
