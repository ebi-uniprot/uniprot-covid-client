import React from 'react';
import { MemoryRouter as Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import EntryMain from '../EntryMain';
import uniProtKbConverter from '../../../adapters/UniProtkbConverter';
import mockData from '../../../__mocks__/entryModelData.json';
import renderWithRedux from '../../../../shared/__testHelpers__/renderWithRedux';

describe('Entry view', () => {
  test('should render', async () => {
    await act(async () => {
      const { asFragment } = renderWithRedux(
        <Router>
          <EntryMain transformedData={uniProtKbConverter(mockData)} />
        </Router>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
