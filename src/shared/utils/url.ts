import queryString from 'query-string';
import { uniq } from 'lodash';
import urlJoin from 'url-join';

export const joinUrl = (...args: string[]) => urlJoin(args);

export const urlsAreEqual = (
  url1: string,
  url2: string,
  ignoreParams: string[] = []
) => {
  const urlObject1 = queryString.parseUrl(url1);
  const urlObject2 = queryString.parseUrl(url2);
  if (urlObject1.url !== urlObject2.url) {
    return false;
  }
  const paramsIntersection = uniq([
    ...Object.keys(urlObject1.query),
    ...Object.keys(urlObject1.query),
  ]);
  return paramsIntersection.every(
    param =>
      ignoreParams.includes(param) ||
      urlObject1.query[param] === urlObject2.query[param]
  );
};
