import { Program } from '../types/blastServerParameters';
import { FormParameters } from '../types/blastFormParameters';

export type SelectedTaxon = { label: string; id: string };

export type BlastFormValue = {
  fieldName: string;
  selected?: string | SelectedTaxon[] | boolean | number;
  type?: BlastFieldTypes;
  values?: { label?: string; value?: string | boolean | number }[];
};

export enum BlastFields {
  program = 'Program',
  stype = 'Sequence type',
  sequence = 'Sequence',
  taxons = 'Taxons',
  targetDb = 'Target database',
  threshold = 'E-Threshold',
  matrix = 'Matrix',
  filter = 'Filter',
  gapped = 'Gapped',
  hits = 'Hits',
  name = 'Name',
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
    values: [
      { value: 'blastp' },
      { value: 'blastx' },
      { value: 'blastn' },
      { value: 'tblastx' },
      { value: 'tblastn' },
    ],
    selected: 'blastp' as Program,
  },
  [BlastFields.stype]: {
    fieldName: 'stype',
    values: [
      { value: 'protein', label: 'Protein' },
      { value: 'dna', label: 'DNA/RNA' },
    ],
    selected: 'protein' as FormParameters['stype'],
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
    ] as Array<{ label: string; value: FormParameters['database'] }>,
  },
  [BlastFields.taxons]: {
    fieldName: 'taxids',
    type: BlastFieldTypes.autocomplete,
  },
  // 'exp' parameter
  [BlastFields.threshold]: {
    fieldName: 'threshold',
    type: BlastFieldTypes.select,
    selected: '10',
    values: [
      { label: '0.0001', value: '1e-4' },
      { label: '0.001', value: '1e-3' },
      { label: '0.01', value: '1e-2' },
      { label: '0.1', value: '1e-1' },
      { label: '1', value: '1' },
      { value: '10' },
      { value: '100' },
      { value: '1000' },
    ] as Array<{ label?: string; value: FormParameters['threshold'] }>,
  },
  [BlastFields.matrix]: {
    fieldName: 'matrix',
    type: BlastFieldTypes.select,
    selected: 'BLOSUM62',
    values: [
      // TODO 'Auto' behaves as follows in current website
      // length > 85: "blosum62"
      // length > 49: "blosum80"
      // length > 34: "pam70"
      // otherwise "pam30"
      // This should be handled in BlastForm.tsx
      { value: 'BLOSUM45' },
      { value: 'BLOSUM62' },
      { value: 'BLOSUM80' },
      { value: 'PAM70' },
      { value: 'PAM30' },
    ] as Array<{ label?: string; value: FormParameters['matrix'] }>,
  },
  [BlastFields.filter]: {
    fieldName: 'filter',
    type: BlastFieldTypes.select,
    selected: 'F',
    values: [
      { value: 'F', label: 'None' },
      { value: 'T', label: 'Filter low complexity regions' },
    ] as Array<{ label?: string; value: FormParameters['filter'] }>,
  },
  // 'gapalign'
  [BlastFields.gapped]: {
    fieldName: 'gapped',
    type: BlastFieldTypes.select,
    selected: true,
    values: [
      { value: true, label: 'yes' },
      { value: false, label: 'no' },
    ] as Array<{ label?: string; value: FormParameters['gapped'] }>,
  },
  // Note: this corresponds to BOTH 'alignments' AND 'scores' AT THE SAME TIME!
  [BlastFields.hits]: {
    fieldName: 'hits',
    type: BlastFieldTypes.select,
    selected: 250,
    values: [
      { value: 50 },
      { value: 100 },
      { value: 250 },
      { value: 500 },
      { value: 750 },
      { value: 1000 },
    ] as Array<{ value: FormParameters['hits'] }>,
  },
  [BlastFields.name]: {
    fieldName: 'name',
    type: BlastFieldTypes.textarea,
  },
};
