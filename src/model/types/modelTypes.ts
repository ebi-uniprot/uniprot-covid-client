export type EvidenceType = {
  evidenceCode: string; // TODO this needs to be an ECO instead of string
  source: string;
  id: string;
};

export type ValueWithEvidence = {
  value: string;
  evidences: EvidenceType[];
};

export enum PropertyKey {
  Chains = 'Chains',
  Component = 'Component',
  Description = 'Description',
  Disease = 'Disease',
  EntryName = 'EntryName',
  ExpressionPatterns = 'ExpressionPatterns',
  FamilyName = 'FamilyName',
  Fingerprint = 'Fingerprint',
  GeneId = 'GeneId',
  GeneName = 'GeneName',
  GenericName = 'GenericName',
  GoEvidenceType = 'GoEvidenceType',
  GoTerm = 'GoTerm',
  Interactions = 'Interactions',
  MatchStatus = 'MatchStatus',
  Method = 'Method',
  MoleculeType = 'MoleculeType',
  NucleotideSequenceId = 'NucleotideSequenceId',
  OrganismId = 'OrganismId',
  OrganismName = 'OrganismName',
  PathwayName = 'PathwayName',
  ProteinId = 'ProteinId',
  Resolution = 'Resolution',
  Status = 'Status',
  ToxonomicScope = 'ToxonomicScope',
  type = 'type',
}

export type Property = {
  key?: PropertyKey;
  value?: string;
};
