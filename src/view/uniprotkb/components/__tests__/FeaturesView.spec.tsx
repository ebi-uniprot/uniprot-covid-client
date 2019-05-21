import React from 'react';
import { render, cleanup } from 'react-testing-library';
import FeaturesView from '../FeaturesView';
import data from './modelData.json';

afterEach(cleanup);

describe('FeaturesView component', () => {
  test('it renders without crashing', () => {
    const { asFragment } = render(<FeaturesView data={data} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
