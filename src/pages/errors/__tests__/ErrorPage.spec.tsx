import React from 'react';
import ErrorPage from '../ErrorPage';
import renderWithRedux from '../../../__testHelpers__/renderWithRedux';
import ArtWork from '../../../svg/error.svg';

describe('ErrorPage component', () => {
  test('should render', () => {
    const { asFragment } = renderWithRedux(
      <ErrorPage
        artwork={<ArtWork />}
        message={() => <span>test</span>}
        testid="testid"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
