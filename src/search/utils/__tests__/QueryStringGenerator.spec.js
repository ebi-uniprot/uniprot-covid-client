import { createQueryString, createFacetsQueryString } from '../QueryStringGenerator';

const clauses = [
  {
    id: 'field_simple',
    field: {
      label: 'Entry Name [ID]',
      itemType: 'single',
      term: 'mnemonic',
      dataType: 'string',
      description: 'Search by UniProtKB entry name',
      example: 'P53_HUMAN',
    },
    logic: 'AND',
    queryInput: {
      stringValue: 'blah',
    },
  },
  {
    id: 'field_empty_input',
    field: {
      label: 'Entry Name [ID]',
      itemType: 'single',
      term: 'mnemonic',
      dataType: 'string',
      description: 'Search by UniProtKB entry name',
      example: 'P53_HUMAN',
    },
    logic: 'AND',
    queryInput: {},
  },
  {
    id: 'field_cc_evidence',
    field: {
      label: 'ChEBI term',
      itemType: 'comment',
      term: 'cofactor_chebi',
      dataType: 'string',
      hasEvidence: true,
      autoComplete: 'https://www.ebi.ac.uk/proteins/api/selector?chebi=?',
      description: 'Search by cofactor chebi ',
      example: '29105',
    },
    logic: 'AND',
    queryInput: {
      stringValue: 'blah',
      evidenceValue: 'blahvidence',
    },
  },
  {
    id: 'field_ft_evidence',
    field: {
      label: 'Calcium binding',
      itemType: 'feature',
      term: 'ca_bind',
      dataType: 'string',
      hasRange: true,
      hasEvidence: true,
      description: 'Search by feature calcium binding',
      example: 'site',
    },
    logic: 'AND',
    queryInput: {
      stringValue: 'blah',
      evidenceValue: 'blahvidence',
    },
  },
  {
    id: 'field_simple_range',
    field: {
      label: 'Any',
      itemType: 'feature',
      term: 'sites',
      dataType: 'string',
      hasRange: true,
      hasEvidence: true,
      description: 'Search by feature sites',
      example: 'translocation',
    },
    logic: 'AND',
    queryInput: {
      rangeFrom: 10,
      rangeTo: 100,
    },
  },
  {
    id: 'field_ft_range_evidence',
    field: {
      label: 'Any',
      itemType: 'feature',
      term: 'sites',
      dataType: 'string',
      hasRange: true,
      hasEvidence: true,
      description: 'Search by feature sites',
      example: 'translocation',
    },
    logic: 'AND',
    queryInput: {
      rangeFrom: 10,
      rangeTo: 100,
      evidenceValue: 'blahvidence',
    },
  },
  {
    id: 'field_range_date',
    field: {
      label: 'Date Of Creation',
      itemType: 'single',
      term: 'created',
      dataType: 'date',
      hasRange: true,
      description: 'Search by Date of creation',
      example: '[2018-03-04 TO 2018-03-08]',
    },
    logic: 'AND',
    queryInput: {
      rangeFrom: '2018-03-04',
      rangeTo: '2018-03-08',
    },
  },
  {
    id: 'field_xref',
    field: {
      label: 'PDB',
      itemType: 'database',
      term: 'xref',
      dataType: 'string',
      valuePrefix: 'pdb',
    },
    logic: 'AND',
    queryInput: {
      stringValue: 'Something',
    },
  },
];

describe('QueryHelper', () => {
  test('should ignore empty fields', () => {
    const queryString = createQueryString(clauses.filter(f => f.id === 'field_empty_input'));
    expect(queryString).toBe('');
  });

  test('should generate simple query', () => {
    const queryString = createQueryString(clauses.filter(f => f.id === 'field_simple'));
    expect(queryString).toBe('(mnemonic:blah)');
  });

  test('should handle cc evidence tags', () => {
    const queryString = createQueryString(clauses.filter(f => f.id === 'field_cc_evidence'));
    expect(queryString).toBe('((cc_cofactor_chebi:blah)AND(ccev_cofactor_chebi:blahvidence))');
  });

  test('should handle ft evidence tags', () => {
    const queryString = createQueryString(clauses.filter(f => f.id === 'field_ft_evidence'));
    expect(queryString).toBe('((ft_ca_bind:blah)AND(ftev_ca_bind:blahvidence))');
  });

  test('should handle range', () => {
    const queryString = createQueryString(clauses.filter(f => f.id === 'field_simple_range'));
    expect(queryString).toBe('(ftlen_sites:[10 TO 100])');
  });

  test('should handle ft range and evidence', () => {
    const queryString = createQueryString(clauses.filter(f => f.id === 'field_ft_range_evidence'));
    expect(queryString).toBe('((ftlen_sites:[10 TO 100])AND(ftev_sites:blahvidence))');
  });

  test('should handle date range', () => {
    const queryString = createQueryString(clauses.filter(f => f.id === 'field_range_date'));
    expect(queryString).toBe('(created:[2018-03-04 TO 2018-03-08])');
  });

  test('should handle xrefs', () => {
    const queryString = createQueryString(clauses.filter(f => f.id === 'field_xref'));
    expect(queryString).toBe('(xref:pdb-Something)');
  });

  test('should generate facet query', () => {
    const facets = {
      facet1: ['value 1', 'value2'],
      facet2: ['value 3'],
    };
    const queryString = createFacetsQueryString(facets);
    expect(queryString).toBe(' AND (facet1:value 1) AND (facet1:value2) AND (facet2:value 3)');
  });

  // TODO databases
});
