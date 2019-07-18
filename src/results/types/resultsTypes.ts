export enum SortableColumn {
  accession = 'accession',
  mnemonic = 'mnemonic',
  name = 'name',
  // eslint-disable-next-line @typescript-eslint/camelcase
  annotation_score = 'annotation_score',
  gene = 'gene',
  length = 'length',
  mass = 'mass',
  organism = 'organism',
}

export enum SortDirection {
  ascend = 'ascend',
  descend = 'descend',
}

export enum SortDirectionApi {
  ascend = 'asc',
  descend = 'desc',
}

export const getApiSortDirection = (direction: SortDirection) =>
  direction === SortDirection.ascend
    ? SortDirectionApi.ascend
    : SortDirectionApi.descend;

export type SelectedFacet = { name: string; value: string };
export type SelectedEntries = { [key: string]: boolean };
