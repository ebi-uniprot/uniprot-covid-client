import { Citation } from '../../model/uniprotkb/UniProtkbConverter';

export type LiteratureStatistics = {
  reviewedProteinCount?: number;
  unreviewedProteinCount?: number;
  mappedProteinCount?: number;
};

export type LiteratureEntry = {
  pubmedId?: number;
  doiId?: string;
  title?: string;
  authors?: string[];
  completeAuthorList?: boolean;
  publicationDate?: string;
  journal?: string;
  firstPage?: string;
  lastPage?: string;
  volume?: string;
  literatureAbstract?: string;
  statistics?: LiteratureStatistics;
  authoringGroup?: string[];
};

export type LiteratureForProteinAPI = {
  literatureEntry: LiteratureEntry;
  uniProtReference?: Citation;
  literatureMappedReference?: {
    uniprotAccession: string;
    source: string;
    sourceId: string;
    annotation: string;
  };
  categories?: string[];
  publicationSource?: string;
};
