import { UniProtkbAPIModel } from '../../model/uniprotkb/UniProtkbConverter';
import { Facet } from '../ResultsContainer';

export enum ViewMode {
  TABLE,
  CARD,
}

export type ResultsState = {
  tableColumns: string[];
  cardColumns: string[];
  facets: Facet[];
  nextUrl: string;
  isFetching: boolean;
  isFetched: { [url: string]: boolean };
  results: UniProtkbAPIModel[];
  totalNumberResults: number;
  viewMode: ViewMode;
};

const resultsInitialState = {
  tableColumns: ['accession', 'id', 'protein_name', 'gene_names', 'organism'],
  cardColumns: [
    'accession',
    'id',
    'protein_name',
    'gene_names',
    'organism',
    'keyword',
    'cc:function',
    'sequence',
  ],
  results: [],
  facets: [],
  isFetching: false,
  isFetched: {},
  nextUrl: '',
  totalNumberResults: 0,
  viewMode: ViewMode.CARD,
};

export default resultsInitialState;