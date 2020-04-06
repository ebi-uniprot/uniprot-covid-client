import { UniProtkbAPIModel } from '../../model/uniprotkb/UniProtkbConverter';
import { Column } from '../../model/types/ColumnTypes';
import { FieldData, ColumnSelectTab } from '../types/resultsTypes';
import { Facet } from '../../types/responseTypes';

export enum ViewMode {
  TABLE,
  CARD,
}

export type ResultsState = {
  tableColumns: Column[];
  facets: Facet[];
  nextUrl: string;
  results: {
    data: UniProtkbAPIModel[];
    isFetching: boolean;
    isFetched: { [url: string]: boolean };
  };
  totalNumberResults: number;
  releaseDate: string;
  viewMode: ViewMode;
  fields: {
    data: FieldData;
    isFetching: boolean;
  };
};

export const defaultTableColumns = [
  Column.accession,
  Column.reviewed,
  Column.id,
  Column.proteinName,
  Column.geneNames,
  Column.organism,
];

const resultsInitialState = {
  tableColumns: defaultTableColumns,
  results: {
    data: [],
    isFetching: false,
    isFetched: {},
  },
  facets: [],
  nextUrl: '',
  totalNumberResults: 0,
  releaseDate: '',
  viewMode: ViewMode.CARD,
  fields: {
    data: {
      [ColumnSelectTab.data]: [],
      [ColumnSelectTab.links]: [],
    },
    isFetching: false,
  },
};

export default resultsInitialState;
