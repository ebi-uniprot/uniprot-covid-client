import React from 'react';
import NoResultsPage from '../NoResultsPage';
import renderWithRedux from '../../../../shared/__testHelpers__/renderWithRedux';

describe('NoResultsPage component', () => {
  test('should render', () => {
    const { asFragment } = renderWithRedux(<NoResultsPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
