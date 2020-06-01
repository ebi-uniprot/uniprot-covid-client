import convertFormParametersForServer from '../BlastParametersAdapter';

describe('BlastParametersAdapter tests', () => {
  it('should translate blast parameters accurately', () => {
    const formParams = {
      program: 'program_name',
      matrix: 'matrix_type',
      hits: 250,
      threshold: '1e-4',
      filter: 'F',
      gapped: false,
      taxIDs: '1234',
      stype: 'protein',
      sequence: 'ATGC',
      database: 'UniProt',
    };
    const formData = convertFormParametersForServer(formParams);
    expect(Array.from(formData.entries())).toEqual([
      ['program', 'program_name'],
      ['email', 'uuw_dev@uniprot.org'],
      ['matrix', 'matrix_type'],
      ['alignments', '250'],
      ['scores', '250'],
      ['exp', '1e-4'],
      ['filter', 'F'],
      ['taxids', '1234'],
      ['stype', 'protein'],
      ['sequence', 'ATGC'],
      ['database', 'UniProt'],
    ]);
  });
});
