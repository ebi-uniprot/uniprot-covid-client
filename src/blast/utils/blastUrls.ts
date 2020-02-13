const baseUrl = 'https://www.ebi.ac.uk/Tools/services/rest/ncbiblast';

export default {
  runUrl: `${baseUrl}/run`,
  statusUrl: (jobId: string) => `${baseUrl}/status/${jobId}`,
  resultUrl: (jobId: string) => `${baseUrl}/result/${jobId}/jdp?format=json`,
};
