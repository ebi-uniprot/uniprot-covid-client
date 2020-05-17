import React from 'react';
import {render} from '@testing-library/react';
import NameView from '../NameView';

describe('NameView component', () => {
  test('should render', () => {
    const alternativeNames = ['name1', 'name2', 'name3'];
    const {asFragment} = render(
      <NameView
        name="Name"
        shortName="Short Name"
        alternativeNames={alternativeNames}
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
