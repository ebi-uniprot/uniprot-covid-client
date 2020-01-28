import { UniProtkbAPIModel } from '../../model/uniprotkb/UniProtkbConverter';
import { LiteratureForProteinAPI } from '../../literature/types/LiteratureTypes';

export type EntryState = {
  accession: string | null;
  data: UniProtkbAPIModel | null;
  publicationsData: {
    isFetching: boolean;
    isFetched: { [url: string]: boolean };
    data: LiteratureForProteinAPI[];
    nextUrl: string;
    total: number;
  };
};

const entryInitialState = {
  accession: null,
  data: null,
  publicationsData: {
    isFetching: false,
    isFetched: {},
    data: [],
    nextUrl: '',
    total: 0,
  },
};

export default entryInitialState;
