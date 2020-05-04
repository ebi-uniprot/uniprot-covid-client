import React from 'react';
import JobErrorPage from '../JobErrorPage';
import renderWithRedux from '../../../__testHelpers__/renderWithRedux';

describe('JobErrorPage component', () => {
  test('should render', () => {
    const { asFragment } = renderWithRedux(<JobErrorPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
