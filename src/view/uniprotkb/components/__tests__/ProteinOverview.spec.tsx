import React from 'react';
import { render } from '@testing-library/react';
import ProteinOverview, {
  annotationScoreToPercentage,
} from '../ProteinOverviewView';
import ProteinNamesUIDataJson from '../__mocks__/ProteinNamesUIData.json';
import EntrySection from '../../../../model/types/EntrySection';

describe('ProteinOverview component', () => {
  test('should render', () => {
    const transformedData = {
      proteinExistence: 'IT exists',
      annotationScore: 12.4,
    };
    transformedData[EntrySection.NamesAndTaxonomy] = ProteinNamesUIDataJson;

    const { asFragment } = render(
      <ProteinOverview transformedData={transformedData} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('annotationScoreToPercentage function', () => {
  /*
    0-19  | bin 1 | 20%
    20-39 | bin 2 | 40%
    40-59 | bin 3 | 60%
    60-79 | bin 4 | 80%
    >=80  | bin 5 | 100%
  */
  const annotationScoreToPercentageTests = [
    // [annotation score, percentage]
    [0, 20],
    [1, 20],
    [19, 20],
    [20, 40],
    [39, 40],
    [40, 60],
    [59, 60],
    [60, 80],
    [79, 80],
    [80, 100],
    [81, 100],
    [1000, 100],
  ];
  annotationScoreToPercentageTests.forEach(([annotationScore, percentage]) => {
    test(`Should convert annotationScore of ${annotationScore} to ${percentage}%`, () => {
      expect(annotationScoreToPercentage(annotationScore)).toEqual(percentage);
    });
  });
});
