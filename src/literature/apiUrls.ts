import { joinUrl, devPrefix } from '../utils/apiUrls';

const literatureApiUrls = {
  literature: joinUrl(devPrefix, '/uniprot/api/literature'),
};

export const getPublicationURL = (id: string) =>
  joinUrl(literatureApiUrls.literature, id);

export const getPublicationsURL = (ids: string[]) =>
  `${literatureApiUrls.literature}/searchs?query=(${ids
    .map((id) => `id:${id}`)
    .join(' OR ')})`;

export default literatureApiUrls;
