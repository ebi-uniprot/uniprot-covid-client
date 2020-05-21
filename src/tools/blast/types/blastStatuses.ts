/* Job statuses as given by the server */

// as returned by https://wwwdev.ebi.ac.uk/Tools/services/rest/ncbiblast/status/{jobId}
export enum Status {
  CREATED = 'CREATED', // not from the server, for internal use
  FAILED = 'FAILED', // not from the server?, for internal use
  RUNNING = 'RUNNING',
  FINISHED = 'FINISHED',
  NOT_FOUND = 'NOT_FOUND',
  // SOME RRORED STATUS FROM THE SERVER?
}
