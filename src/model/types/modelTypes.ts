export type EvidenceType = {
  evidenceCode: string; // TODO this needs to be an ECO instead of string
  source: string;
  id: string;
};

export type ValueWihEvidence = {
  value: string;
  evidences: EvidenceType[];
};

export type Property = {
  key?: string;
  value?: string;
};
