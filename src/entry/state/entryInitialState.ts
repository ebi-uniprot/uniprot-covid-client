import { UniProtkbAPIModel } from '../../model/uniprotkb/UniProtkbConverter';
import { LiteratureForProteinAPI } from '../../literature/types/LiteratureTypes';
import { Facet } from '../../results/ResultsContainer';

export type EntryState = {
  accession: string | null;
  isFetching: boolean;
  data: UniProtkbAPIModel | null;
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
