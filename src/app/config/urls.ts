import { invert } from 'lodash-es';

export enum Location {
  Home = 'Home',
  UniProtKBResults = 'UniProtKBResults',
  UniProtKBEntry = 'UniProtKBEntry',
  UniProtKBDownload = 'UniProtKBDownload',
  Blast = 'Blast',
  UniProtKBCustomiseTable = 'UniProtKBCustomiseTable',
  UniProtKBQueryBuilder = 'UniProtKBQueryBuilder',
  PageNotFound = 'PageNotFound',
  ServiceUnavailable = 'ServiceUnavailable',
  JobError = 'JobError',
  Dashboard = 'Dashboard',
}

export const LocationToPath = {
  [Location.Home]: '/',
  [Location.UniProtKBResults]: '/uniprotkb',
  [Location.UniProtKBEntry]: '/uniprotkb/:accession',
  [Location.UniProtKBDownload]: '/download',
  [Location.Blast]: '/blast',
  [Location.UniProtKBCustomiseTable]: '/customise-table',
  [Location.UniProtKBQueryBuilder]: '/advancedSearch',
  [Location.PageNotFound]: '/page-not-found',
  [Location.ServiceUnavailable]: '/service-unavailable',
  [Location.JobError]: '/job-error',
  [Location.Dashboard]: '/tool-dashboard',
};

export const PathToLocation = invert(LocationToPath);
