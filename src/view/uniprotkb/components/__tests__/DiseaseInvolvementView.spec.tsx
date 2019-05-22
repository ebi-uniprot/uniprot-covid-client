import React from 'react';
import { render } from 'react-testing-library';
import DiseaseInvolvement from '../DiseaseInvolvementView';
import DiseaseInvolvementUIDataJson from '../__mocks__/DiseaseInvolvementUIData.json';

describe('DiseaseInvolvement', () => {
  test('should render DiseaseInvolvement', () => {
    const { asFragment } = render(
      <DiseaseInvolvement
        comments={DiseaseInvolvementUIDataJson}
        primaryAccession="P05067"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
