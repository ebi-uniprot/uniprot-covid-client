import React from 'react';
import { render } from '@testing-library/react';
import CatalyticActivityView, {
  getRheaId,
  isRheaReactionReference,
  RheaReactionVisualizer,
} from '../CatalyticActivityView';
import CatalyticActivityUIDataJson from '../__mocks__/CatalyticActivityUIData.json';

describe('Catalytic activity', () => {
  test('should render catalytic activity', () => {
    const { asFragment } = render(
      <CatalyticActivityView comments={CatalyticActivityUIDataJson} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('RheaReactionVisualizer', () => {
  test('should render RheaReactionVisualizer', () => {
    const { asFragment } = render(
      <RheaReactionVisualizer rheaId={12345} show={false} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('getRheaId', () => {
  test('should return id 12345 from RHEA:12345', () => {
    expect(getRheaId('RHEA:12345')).toEqual(12345);
  });
  test('should return null from RHEA-COMP:12345', () => {
    expect(getRheaId('RHEA-COMP:12345')).toEqual(null);
  });
});

describe('isRheaReactReference', () => {
  test('should return true when database=Rhea and id string is RHEA:12345', () => {
    expect(
      isRheaReactionReference({ databaseType: 'Rhea', id: 'RHEA:12345' })
    ).toEqual(true);
  });
  test('should return true when database=ChEBI and id string is CHEBI:57287', () => {
    expect(
      isRheaReactionReference({ databaseType: 'ChEBI', id: 'CHEBI:57287' })
    ).toEqual(false);
  });
});
