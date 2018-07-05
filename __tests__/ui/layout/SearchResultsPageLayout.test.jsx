import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

describe('SearchResultsPageLayout component', () => {
  test('should render', () => {
    let component = <MemoryRouter />;

    component = renderer.create(component).toJSON();

    expect(component).toMatchSnapshot();
  });
});
