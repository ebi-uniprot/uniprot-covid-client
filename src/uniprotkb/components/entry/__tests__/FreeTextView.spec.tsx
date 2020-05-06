import React from 'react';
import { render } from '@testing-library/react';
import FreeTextView from '../FreeTextView';
import FreeTextUIDataJson from './__mockData__/FreeTextUIData.json';

describe('FreeText component', () => {
  test('should render free text CC', () => {
    const { asFragment } = render(
      <FreeTextView comments={FreeTextUIDataJson} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
