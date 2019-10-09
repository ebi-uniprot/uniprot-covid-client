import React from 'react';
import HomePage from '../HomePage';
import renderWithRedux from '../../__tests__/renderWithRedux.spec';

describe('HomePage component', () => {
  test('should render', () => {
    const { asFragment } = renderWithRedux(<HomePage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
