import { joinUrl } from './apiUrls';

const externalUrls = {
  IntAct: '//www.ebi.ac.uk/intact/',
  QuickGO: (id: string) => `//www.ebi.ac.uk/QuickGO/term/${id}`,
  NCBI: (id: string) =>
    `https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?lvl=0&id=${id}`,
  ENA: (id: string) => `//www.ebi.ac.uk/ena/data/view/${id}`,
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
