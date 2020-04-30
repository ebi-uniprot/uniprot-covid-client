import React from 'react';
import UniProtKBEntryPublications from '../UniProtKBEntryPublications';
import { render } from '@testing-library/react';
import useDataApi from '../../../hooks/useDataApi';
import { getPublicationsURL } from '../../apiUrls';

jest.mock('../../../hooks/useDataApi', () => ({
  __esModule: true, // this makes it work
  default: jest.fn(() => ({
    loading: false,
  })),
}));

describe('UniProtKBEntryPublications', () => {
  it('Should make a call with pubmed ids', () => {
    const pubMedIds = ['123', '456'];
    render(<UniProtKBEntryPublications pubmedIds={pubMedIds} />);
    expect(useDataApi).toHaveBeenCalledWith(getPublicationsURL(pubMedIds));
  });
});
