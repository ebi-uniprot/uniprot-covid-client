export enum Location {
  Home = 'Home',
  UniProtKB_Results = 'UniProtKB_Results',
  UniProtKB_Entry = 'UniProtKB_Entry',
  UniProtKB_Download = 'UniProtKB_Download',
  UniProtKB_CustomiseTable = 'UniProtKB_CustomiseTable',
  UniProtKB_QueryBuilder = 'UniProtKB_QueryBuilder',
}

export const LocationToPath = new Map([
  [Location.Home, '/'],
  [Location.UniProtKB_Results, '/uniprotkb'],
  [Location.UniProtKB_Entry, '/uniprotkb/:accession'],
  [Location.UniProtKB_Download, '/download'],
  [Location.UniProtKB_CustomiseTable, '/customise-table'],
  [Location.UniProtKB_QueryBuilder, '/advancedSearch'],
]);

export const PathToLocation = new Map(
  Array.from(LocationToPath, ([location, path]: [Location, string]) => [
    path,
    location,
  ])
);
