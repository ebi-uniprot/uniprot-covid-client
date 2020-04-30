import { LiteratureForProteinAPI } from '../../literature/types/LiteratureTypes';
import { Facet } from '../../types/responseTypes';

export type EntryState = {
  publicationsData: {
    isFetching: boolean;
    data: LiteratureForProteinAPI[];
    facets: Facet[];
    nextUrl: string;
    total: number;
  };
};

const entryInitialState = {
  publicationsData: {
    isFetching: false,
    data: [],
    facets: [],
    nextUrl: '',
    total: 0,
  },
};

export default entryInitialState;
