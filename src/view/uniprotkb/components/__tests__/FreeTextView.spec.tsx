import React from 'react';
import { render } from 'react-testing-library';
import FreeTextView from '../FreeTextView';
import FreeTextUIDataJson from '../__mocks__/FreeTextUIData.json';

describe('FreeText component', () => {
  test('should render free text CC', () => {
    const { asFragment } = render(
      <FreeTextView comments={FreeTextUIDataJson} includeTitle={true} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
