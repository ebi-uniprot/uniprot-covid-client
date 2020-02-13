export type BlastFormValue = {
  fieldName: string;
  selected?: string | undefined;
  selectedLabel?: string | undefined;
  type: BlastFieldTypes;
  values?: { label?: string; value?: string | number }[];
};

export enum BlastFields {
  program = 'Program',
  stype = 'Sequence type',
  email = 'Email',
  sequence = 'Sequence',
  taxon = 'Taxon',
  targetDb = 'Target database',
  threshold = 'E-Threshold',
  matrix = 'Matrix',
  filter = 'Filter',
  gapped = 'Gapped',
  hits = 'Hits',
}

export enum BlastFieldTypes {
  textarea,
  select,
  autocomplete,
}

export type BlastFormValues = { [x in BlastFields]: BlastFormValue };

export default {
  [BlastFields.program]: {
    fieldName: 'program',
    selected: 'blastp',
  },
  [BlastFields.stype]: {
    fieldName: 'stype',
    selected: 'protein',
  },
  [BlastFields.email]: {
    fieldName: 'email',
    selected: 'uuw_dev@uniprot.org',
  },
  [BlastFields.sequence]: {
    fieldName: 'sequence',
    type: BlastFieldTypes.textarea,
  },
  [BlastFields.targetDb]: {
    fieldName: 'database',
    type: BlastFieldTypes.select,
    selected: 'uniprotkb_refprotswissprot',
    values: [
      {
        value: 'uniprotkb_refprotswissprot',
        label: 'UniProtKb',
      },
    ],
  },
  [BlastFields.taxon]: {
    fieldName: 'taxids',
    type: BlastFieldTypes.autocomplete,
  },
  [BlastFields.threshold]: {
    fieldName: 'threshold',
    type: BlastFieldTypes.select,
    selected: '10',
    values: [
      { value: '0.0001' },
      { value: '0.001' },
      { value: '0.01' },
      { value: '0.1' },
      { value: '1' },
      { value: '10' },
      { value: '100' },
      { value: '1000' },
    ],
  },
  [BlastFields.matrix]: {
    fieldName: 'matrix',
    type: BlastFieldTypes.select,
    selected: null,
    values: [
      {
        value: '',
        label: 'Auto',
      },
      { value: '45' },
      { value: '62' },
      { value: '80' },
      { value: '70' },
      { value: '30' },
    ],
  },
  [BlastFields.filter]: {
    fieldName: 'filter',
    type: BlastFieldTypes.select,
    selected: 'F',
    values: [
      { value: 'F', label: 'None' },
      { valueNone: 'T', label: 'Filter low complexity regions' },
      { value: 'mask', label: 'Mask lookup table only' },
    ],
  },
  [BlastFields.gapped]: {
    fieldName: 'gapped',
    type: BlastFieldTypes.select,
    selected: 'true',
    values: [
      { value: 'true', label: 'yes' },
      { value: 'false', label: 'no' },
    ],
  },
  [BlastFields.hits]: {
    fieldName: 'hits',
    type: BlastFieldTypes.select,
    selected: '250',
    values: [
      { value: '50' },
      { value: '100' },
      { value: '250' },
      { value: '500' },
      { value: '750' },
      { value: '1000' },
    ],
  },
};
