import React from 'react';
import axios from 'axios';
import { render, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import VariationView from '../VariationView';

jest.mock('axios');
const resp = { data: { sequence: 'ABCDEFG', features: [{}, {}] } };
afterEach(cleanup);

// The warning about `act()` should disappear after update to 16.9
// https://github.com/testing-library/react-testing-library/issues/281

describe('VariationView component', () => {
  test('it renders without crashing', () => {
    axios.get.mockResolvedValue(resp);
    act(() => {
      const { asFragment } = render(<VariationView accession="P05067" />);
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
