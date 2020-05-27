import {
  ServerParameters,
  Exp,
  Program,
  Database,
  SType,
  Matrix,
  Filter,
  GapAlign,
  Alignments,
  Scores,
} from '../types/blastServerParameters';
import { FormParameters } from '../types/blastFormParameters';

export type FormValue = { label: string; value: string | number };

export type BlastFormValue = {
  fieldName: string;
  selected?: string | undefined;
  selectedLabel?: string | undefined;
  type?: BlastFieldTypes;
  values?: FormValue[];
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
  // we don't need to display this, or even to render it hidden
  [BlastFields.program]: {
    fieldName: 'program',
    selected: 'blastp' as Program,
  },
  [BlastFields.stype]: {
    fieldName: 'type',
    selected: 'protein' as FormParameters['type'],
  },
  // we don't need to display this, or even to render it hidden
  [BlastFields.email]: {
    fieldName: 'email',
    selected: 'uuw_dev@uniprot.org' as ServerParameters['email'],
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
  [BlastFields.taxon]: {
    fieldName: 'taxids',
    type: BlastFieldTypes.autocomplete,
    values: [],
    selectedLabel: '',
  },
  // Note: is that the 'exp' parameter?
  // if so, we'll need to use the actual required string values
  // (as in: the "1e-1" string instead of 0.1 or 1e-1 numbers)
  [BlastFields.threshold]: {
    fieldName: 'threshold',
    type: BlastFieldTypes.select,
    selected: '10',
    values: [
      { label: '0.0001', value: '1e-4' },
      { label: '0.001', value: '1e-3' },
      { label: '0.01', value: '1e-2' },
      { label: '0.1', value: '1e-1' },
      { label: '1', value: '1.0' },
      { value: '10' },
      { value: '100' },
      { value: '1000' },
    ] as Array<{ label?: string; value: FormParameters['threshold'] }>,
  },
  [BlastFields.matrix]: {
    fieldName: 'matrix',
    type: BlastFieldTypes.select,
    values: [
      // FIXME: decision needed
      // default is BLOSUM62, maybe put that as a default explicitely
      // 'Auto' will leave the user wondering what it actually means
      {
        value: '',
        label: 'Auto',
      },
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
      // TODO: check what this maps to as 'mask' is not an accepted value
      { value: 'mask', label: 'Mask lookup table only' },
    ] as Array<{ label?: string; value: FormParameters['filter'] }>,
  },
  // Note: is that the 'gapalign' parameter?
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
};
