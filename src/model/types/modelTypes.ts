export type Evidence = {
  evidenceCode: string; // TODO this needs to be an ECO instead of string
  source: string;
  id: string;
};

export type ValueWithEvidence = {
  value: string;
  evidences: Evidence[];
};

export type Property = {
  key?: string;
  value?: string;
};
