export type EvidenceType = {
  evidenceCode: string;
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
