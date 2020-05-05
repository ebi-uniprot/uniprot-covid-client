import React from 'react';
import ServiceUnavailablePage from '../ServiceUnavailablePage';
import renderWithRedux from '../../../../shared/__testHelpers__/renderWithRedux';

describe('ServiceUnavailablePage component', () => {
  test('should render', () => {
    const { asFragment } = renderWithRedux(<ServiceUnavailablePage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
