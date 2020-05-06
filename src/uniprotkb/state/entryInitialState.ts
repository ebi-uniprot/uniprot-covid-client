import {
  UniProtkbUIModel,
  UniProtkbInactiveEntryModel,
} from '../adapters/UniProtkbConverter';
import { LiteratureForProteinAPI } from '../types/LiteratureTypes';
import { Facet } from '../types/responseTypes';

export type EntryState = {
  accession: string | null;
  isFetching: boolean;
  data: UniProtkbUIModel | UniProtkbInactiveEntryModel | null;
  publicationsData: {
    isFetching: boolean;
    data: LiteratureForProteinAPI[];
    facets: Facet[];
    nextUrl: string;
    total: number;
  };
};

const entryInitialState = {
  accession: null,
  isFetching: false,
  data: null,
  publicationsData: {
    isFetching: false,
    data: [],
    facets: [],
    nextUrl: '',
    total: 0,
  },
};

export default entryInitialState;
