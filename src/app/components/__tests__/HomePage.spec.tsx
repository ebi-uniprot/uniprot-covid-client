import React from 'react';
import HomePage from '../HomePage';
import renderWithRedux from '../../../shared/__test-helpers__/RenderWithRedux';

describe('HomePage component', () => {
  test('should render', () => {
    const { asFragment } = renderWithRedux(<HomePage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
