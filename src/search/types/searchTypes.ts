export enum Namespace {
  UniProtKB = 'UniProtKB',
  UniRef = 'UniRef',
  UniParc = 'UniParc',
  Proteomes = 'Proteomes',
}

export enum Operator {
  AND = 'AND',
  OR = 'OR',
  NOT = 'NOT',
}

export type FieldType = {
  label: string;
  term: string;
  example: string;
  itemType: string;
  dataType: string;
  hasRange?: boolean;
  hasEvidence?: boolean;
  valuePrefix?: string;
  options?: Array<{
    name: string;
    values: Array<{
      name: string;
      label: string;
    }>;
  }>;
  values?: Array<{
    name: string;
    value: string;
  }>;
};

export type Input = {
  stringValue?: string;
  rangeFrom?: string;
  rangeTo?: string;
  evidenceValue?: string;
};

export type Clause = {
  id: string;
  field: FieldType;
  logicOperator: Operator;
  queryInput: Input;
};
