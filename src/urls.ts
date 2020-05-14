import { invert } from 'lodash';

export enum Location {
  Home = 'Home',
  UniProtKBResults = 'UniProtKBResults',
  UniProtKBEntry = 'UniProtKBEntry',
  UniProtKBDownload = 'UniProtKBDownload',
  UniProtKBCustomiseTable = 'UniProtKBCustomiseTable',
  UniProtKBQueryBuilder = 'UniProtKBQueryBuilder',
  PageNotFound = 'PageNotFound',
  ServiceUnavailable = 'ServiceUnavailable',
  JobError = 'JobError',
  Contact = 'Contact',
  ShowAllResults = 'ShowAllResults',
}

export const LocationToPath = {
  [Location.Home]: '/',
  [Location.UniProtKBResults]: '/uniprotkb',
  [Location.UniProtKBEntry]: '/uniprotkb/:accession',
  [Location.UniProtKBDownload]: '/download',
  [Location.UniProtKBCustomiseTable]: '/customise-table',
  [Location.UniProtKBQueryBuilder]: '/advancedSearch',
  [Location.PageNotFound]: '/page-not-found',
  [Location.ServiceUnavailable]: '/service-unavailable',
  [Location.JobError]: '/job-error',
  [Location.Contact]: '/contact',
  [Location.ShowAllResults]: '/uniprotkb?query=*',
};

export const PathToLocation = invert(LocationToPath);
