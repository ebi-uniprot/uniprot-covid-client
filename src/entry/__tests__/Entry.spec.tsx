import React from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import Entry from '../Entry';
import { act } from 'react-dom/test-utils';
import renderWithRedux from '../../__testHelpers__/renderWithRedux';

describe('Entry', () => {
  test('should render', async () => {
    await act(async () => {
      const { asFragment } = renderWithRedux(
        <Router initialEntries={['/uniprotkb/P05067']}>
          <Route
            component={props => <Entry {...props} />}
            path="/uniprotkb/:accession"
          />
        </Router>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
