import React from 'react';
import { render } from 'react-testing-library';
import { EntryProteinNames } from '../ProteinNamesView';
import ProteinNamesUIData from '../__mocks__/ProteinNamesUIData.json';

describe('ProteinNames', () => {
  test('should render protein_name', () => {
    const { asFragment } = render(
      <EntryProteinNames {...ProteinNamesUIData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
