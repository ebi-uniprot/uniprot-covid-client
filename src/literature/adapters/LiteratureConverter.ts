import { Citation } from '../types/LiteratureTypes';

const formatCitationData = (citation: Citation) => {
  const pubMedXref =
    citation.citationCrossReferences &&
    citation.citationCrossReferences.find((xref) => xref.database === 'PubMed');

  const doiXref =
    citation.citationCrossReferences &&
    citation.citationCrossReferences.find((xref) => xref.database === 'DOI');

  const pubmedId = pubMedXref && pubMedXref.id;

  const journalInfo = {
    journal: citation.journal,
    volume: citation.volume,
    firstPage: citation.firstPage,
    lastPage: citation.lastPage,
    publicationDate: citation.publicationDate,
    doiId: doiXref && doiXref.id,
  };
  return { pubmedId, journalInfo };
};

export default formatCitationData;
