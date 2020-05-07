import joinUrl from 'url-join';

const externalUrls = {
  IntAct: '//www.ebi.ac.uk/intact/',
  QuickGO: (id: string) => `//www.ebi.ac.uk/QuickGO/term/${id}`,
  NCBI: (id: number | string) =>
    `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?lvl=0&id=${id}`,
  ENA: (id: string) => `//www.ebi.ac.uk/ena/data/view/${id}`,
  InterPro: (id: string) => `https://www.ebi.ac.uk/interpro/protein/${id}`,
  Pfam: (id: string) => `http://pfam.xfam.org/protein/${id}`,
  SMART: (id: string) => `https://smart.embl.de/smart/show_motifs.pl?ID=${id}`,
  PROSITE: (id: string) =>
    `https://prosite.expasy.org/cgi-bin/prosite/PSScan.cgi?seq=${id}&output=nice`,
};

export const getIntActQueryForAccessionUrl = (accession: string) =>
  joinUrl(
    externalUrls.IntAct,
    'query',
    `(  idA:${accession} AND idB:${accession}  ) OR (  idA:${accession} AND idB:-  ) OR (  idA:- AND idB:${accession}  )`
  );

export const getIntActQueryUrl = (
  firstInteractor: string,
  secondInteractor: string
) =>
  joinUrl(
    externalUrls.IntAct,
    'query',
    `(${firstInteractor} AND ${secondInteractor})`
  );

export default externalUrls;
