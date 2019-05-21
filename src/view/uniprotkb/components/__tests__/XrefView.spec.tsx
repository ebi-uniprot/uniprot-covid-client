import React from 'react';
import { render } from 'react-testing-library';
import XRefView from '../XRefView';
import xrefUIData from '../__mocks__/XrefUIData.json';
import EntrySectionType from '../../../../model/types/EntrySectionType';
import { XrefUIModel } from '../../../../model/utils/XrefUtils';

describe('XRef', () => {
  for (const section in EntrySectionType) {
    test(`should render for ${section} section`, () => {
      const xrefs = xrefUIData as XrefUIModel[];
      const { asFragment } = render(
        <XRefView xrefs={xrefs} primaryAccession="P01234" />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  }
});
