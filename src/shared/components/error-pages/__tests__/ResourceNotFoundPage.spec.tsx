import React from 'react';
import ResourceNotFoundPage from '../ResourceNotFoundPage';
import renderWithRedux from '../../../../shared/__testHelpers__/renderWithRedux';

describe('ResourceNotFoundPage component', () => {
  test('should render', () => {
    const { asFragment } = renderWithRedux(<ResourceNotFoundPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
