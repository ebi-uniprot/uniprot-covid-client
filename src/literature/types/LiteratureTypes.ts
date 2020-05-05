import { Xref } from '../../model/types/CommentTypes';

export type Citation = {
  citationType?: string;
  authors?: string[];
  citationCrossReferences?: Xref[];
  title?: string;
  publicationDate?: number;
  journal?: string;
  firstPage?: number;
  lastPage?: number;
  volume?: number;
  completeAuthorList?: boolean;
  literatureAbstract?: string;
  authoringGroup?: string[];
  submissionDatabase?: string;
};

export type Reference = {
  citation: Citation;
  referencePositions?: string[];
  referenceComments?: {
    value: string;
    type: string;
  }[];
};

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

export type LiteratureAPI = {
  citation: Citation;
  statistics?: LiteratureStatistics;
};
