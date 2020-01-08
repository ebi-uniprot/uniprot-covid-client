import { UniProtkbAPIModel } from '../../model/uniprotkb/UniProtkbConverter';

export type EntryState = {
  accession: string | null;
  data: UniProtkbAPIModel | null;
};

const entryInitialState = {
  accession: null,
  data: null,
};

export default entryInitialState;
