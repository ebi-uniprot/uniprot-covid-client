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
          id: 'id_all',
          label: 'All',
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
      '((cc_cofactor_chebi:"CHEBI:12345") AND (ccev_cofactor_chebi:blahvidence))',
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
          stringValue: 'blah [CHEBI:12345]',
          id: 'CHEBI:12345',
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
  {
    description: 'should handle any xrefs',
    queryString: '(xref:Something)',
    clauses: [
      {
        searchTerm: {
          id: 'id_xref_any',
          label: 'Any cross-reference',
          itemType: 'database',
          term: 'xref',
          dataType: 'string',
          valuePrefix: 'any',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'Something',
        },
      },
    ],
  },
  {
    description:
      'should generate simple query from two subqueries joined by an AND',
    queryString: '(mnemonic:blah) AND (mnemonic:foo)',
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
          stringValue: 'foo',
        },
      },
    ],
  },
  {
    description:
      'should generate simple query from two subqueries joined by an OR',
    queryString: '(mnemonic:blah) OR (mnemonic:foo)',
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
        logicOperator: 'OR',
        queryInput: {
          stringValue: 'foo',
        },
      },
    ],
  },
  {
    description: 'should generate simple query with a NOT',
    queryString: 'NOT (mnemonic:blah)',
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
        logicOperator: 'NOT',
        queryInput: {
          stringValue: 'blah',
        },
      },
    ],
  },
  {
    description: 'should handle single cc query',
    queryString: '(cc_cofactor_chebi:"CHEBI:12345")',
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
          stringValue: 'blah [CHEBI:12345]',
          id: 'CHEBI:12345',
        },
      },
    ],
  },
  {
    description:
      'should handle an "All" query (eg without a specific field selected)',
    queryString: 'blah',
    clauses: [
      {
        searchTerm: {
          id: 'id_all',
          label: 'All',
          itemType: 'single',
          term: 'All',
          dataType: 'string',
          example: 'a4_human, P05067, cdc7 human',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'blah',
        },
      },
    ],
  },
  {
    description:
      'should handle an "All" query (eg without a specific field selected) with a NOT logic operator',
    queryString: 'NOT blah',
    clauses: [
      {
        searchTerm: {
          id: 'id_all',
          label: 'All',
          itemType: 'single',
          term: 'All',
          dataType: 'string',
          example: 'a4_human, P05067, cdc7 human',
        },
        logicOperator: 'NOT',
        queryInput: {
          stringValue: 'blah',
        },
      },
    ],
  },
  {
    description:
      'An implicit "All" joined to by an OR to a mnemonic search - mixes unbracketed and bracketed terms',
    queryString: 'blah OR (mnemonic:foo)',
    clauses: [
      {
        searchTerm: {
          id: 'id_all',
          label: 'All',
          itemType: 'single',
          term: 'All',
          dataType: 'string',
          example: 'a4_human, P05067, cdc7 human',
        },
        logicOperator: 'AND',
        queryInput: {
          stringValue: 'blah',
        },
      },
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
        logicOperator: 'OR',
        queryInput: {
          stringValue: 'foo',
        },
      },
    ],
  },
  {
    description:
      'should handle ft range and evidence, simple mnemonic, and any query',
    queryString:
      'NOT ((ftlen_sites:[10 TO 100]) AND (ftev_sites:blahvidence)) OR (mnemonic:foo) NOT blah',
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
        logicOperator: 'NOT',
        queryInput: {
          rangeFrom: 10,
          rangeTo: 100,
          evidenceValue: 'blahvidence',
        },
      },
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
        logicOperator: 'OR',
        queryInput: {
          stringValue: 'foo',
        },
      },
      {
        searchTerm: {
          id: 'id_all',
          label: 'All',
          itemType: 'single',
          term: 'All',
          dataType: 'string',
          example: 'a4_human, P05067, cdc7 human',
        },
        logicOperator: 'NOT',
        queryInput: {
          stringValue: 'blah',
        },
      },
    ],
  },
];

export default testData;
