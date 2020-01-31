import { UniProtkbAPIModel } from '../../model/uniprotkb/UniProtkbConverter';

export type EntryState = {
  accession: string | null;
  isFetching: boolean;
  data: UniProtkbAPIModel | null;
};

const entryInitialState = {
  accession: null,
  isFetching: false,
  data: null,
};

export default entryInitialState;
