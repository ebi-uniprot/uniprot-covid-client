const testData = {
  field_simple: {
    description: 'should generate simple query',
    queryString: '(mnemonic:blah)',
    clauses: [
      {
        searchTerm: {
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
    ],
  },
  field_empty_input: {
    description: 'should ignore empty fields',
    queryString: '',
    clauses: [
      {
        searchTerm: {
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
    ],
  },
  field_cc_evidence: {
    description: 'should handle cc evidence tags',
    queryString:
      '((cc_cofactor_chebi:blah) AND (ccev_cofactor_chebi:blahvidence))',
    clauses: [
      {
        searchTerm: {
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
    ],
  },
  field_ft_evidence: {
    description: 'should handle ft evidence tags',
    queryString: '((ft_ca_bind:blah) AND (ftev_ca_bind:blahvidence))',
    clauses: [
      {
        searchTerm: {
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
    ],
  },

  field_simple_range: {
    description: 'should handle range',
    queryString: '(ftlen_sites:[10 TO 100])',
    clauses: [
      {
        searchTerm: {
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
    ],
  },
  field_ft_range_evidence: {
    description: 'should handle ft range and evidence',
    queryString: '((ftlen_sites:[10 TO 100]) AND (ftev_sites:blahvidence))',
    clauses: [
      {
        searchTerm: {
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
    ],
  },
  field_range_date: {
    description: 'should handle date range',
    queryString: '(created:[2018-03-04 TO 2018-03-08])',
    clauses: [
      {
        searchTerm: {
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
    ],
  },
  field_xref: {
    description: 'should handle xrefs',
    queryString: '(xref:pdb-Something)',
    clauses: [
      {
        searchTerm: {
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
    ],
  },
};

export default testData;
/*
AND
NOT
OR
pub: any
*/
