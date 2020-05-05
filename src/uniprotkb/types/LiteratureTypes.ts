import { Reference } from '../adapters/UniProtkbConverter';

export type LiteratureStatistics = {
  reviewedProteinCount?: number;
  unreviewedProteinCount?: number;
  mappedProteinCount?: number;
};

export type LiteratureForProteinAPI = {
  reference: Reference;
  statistics?: LiteratureStatistics;
  categories?: string[];
  publicationSource?: string;
};
