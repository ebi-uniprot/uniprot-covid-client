const testData = [
  {
    description: 'should generate simple query',
    queryString: '(mnemonic:blah)',
    clauses: [
      {
        searchTerm: {
          id: 'id_mnemonic',
          label: 'Entry Name [ID]',
          itemType: 'single',
          term: 'mnemonic',
          dataType: 'string',
          description: 'Search by UniProtKB entry name',
          example: 'P53_HUMAN',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'blah',
        },
      },
    ],
  },
  {
    description: 'should ignore empty fields',
    queryString: '',
    clauses: [
      {
        searchTerm: {
          id: 'id_Any',
          label: 'Any',
          itemType: 'single',
          term: 'All',
          dataType: 'string',
          example: 'a4_human, P05067, cdc7 human',
        },
        logicOperator: 'AND',
        queryInput: {},
      },
    ],
  },
  {
    description: 'should handle cc evidence tags',
    queryString:
      '((cc_cofactor_chebi:blah) AND (ccev_cofactor_chebi:blahvidence))',
    clauses: [
      {
        searchTerm: {
          id: 'id_cofactor_chebi',
          label: 'ChEBI term',
          itemType: 'comment',
          term: 'cofactor_chebi',
          dataType: 'string',
          hasEvidence: true,
          autoComplete: '/uniprot/api/suggester?dict=chebi&query=?',
          description: 'Search by cofactor chebi ',
          example: '29105',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'blah',
          evidenceValue: 'blahvidence',
        },
      },
    ],
  },
  {
    description: 'should handle ft evidence tags',
    queryString: '((ft_ca_bind:blah) AND (ftev_ca_bind:blahvidence))',
    clauses: [
      {
        searchTerm: {
          id: 'id_ca_bind',
          label: 'Calcium binding',
          itemType: 'feature',
          term: 'ca_bind',
          dataType: 'string',
          hasRange: true,
          hasEvidence: true,
          description: 'Search by feature calcium binding',
          example: 'site',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'blah',
          evidenceValue: 'blahvidence',
        },
      },
    ],
  },
  {
    description: 'should handle range',
    queryString: '(ftlen_sites:[10 TO 100])',
    clauses: [
      {
        searchTerm: {
          id: 'id_sites',
          label: 'Any',
          itemType: 'feature',
          term: 'sites',
          dataType: 'string',
          hasRange: true,
          hasEvidence: true,
          description: 'Search by feature sites',
          example: 'translocation',
        },
        logicOperator: 'AND',
        queryInput: {
          rangeFrom: 10,
          rangeTo: 100,
        },
      },
    ],
  },
  {
    description: 'should handle ft range and evidence',
    queryString: '((ftlen_sites:[10 TO 100]) AND (ftev_sites:blahvidence))',
    clauses: [
      {
        searchTerm: {
          id: 'id_sites',
          label: 'Any',
          itemType: 'feature',
          term: 'sites',
          dataType: 'string',
          hasRange: true,
          hasEvidence: true,
          description: 'Search by feature sites',
          example: 'translocation',
        },
        logicOperator: 'AND',
        queryInput: {
          rangeFrom: 10,
          rangeTo: 100,
          evidenceValue: 'blahvidence',
        },
      },
    ],
  },
  {
    description: 'should handle date range',
    queryString: '(created:[2018-03-04 TO 2018-03-08])',
    clauses: [
      {
        searchTerm: {
          id: 'id_created',
          label: 'Date Of Creation',
          itemType: 'single',
          term: 'created',
          dataType: 'date',
          hasRange: true,
          description: 'Search by Date of creation',
          example: '[2018-03-04 TO 2018-03-08]',
        },
        logicOperator: 'AND',
        queryInput: {
          rangeFrom: '2018-03-04',
          rangeTo: '2018-03-08',
        },
      },
    ],
  },
  {
    description: 'should handle xrefs',
    queryString: '(xref:pdb-Something)',
    clauses: [
      {
        searchTerm: {
          id: 'id_xref_pdb',
          label: 'PDB',
          itemType: 'database',
          term: 'xref',
          dataType: 'string',
          valuePrefix: 'pdb',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'Something',
        },
      },
    ],
  },
];

export default testData;
/*
AND
NOT
OR
pub: any
*/
