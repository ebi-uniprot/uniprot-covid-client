export enum sortableColumns {
  accession = 'accession',
  mnemonic = 'mnemonic',
  name = 'name',
  annotation_score = 'annotation_score',
  gene = 'gene',
  length = 'length',
  mass = 'mass',
  organism = 'organism',
}

export type SortDirectionsType = {
  ascend: {
    app: string;
    api: string;
  };
  descend: {
    app: string;
    api: string;
  };
};

export const SortDirections: SortDirectionsType = {
  ascend: {
    app: 'ascend',
    api: 'asc',
  },
  descend: {
    app: 'descend',
    api: 'desc',
  },
};
