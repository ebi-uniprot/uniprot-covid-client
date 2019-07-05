export const expectedDatabaseCategoryToNames = [
  ['SEQ', ['EMBL', 'CCDS', 'PIR', 'RefSeq', 'UniGene']],
  ['3DS', ['PDB', 'PDBsum', 'DisProt', 'ProteinModelPortal', 'SMR']],
  [
    'PPI',
    [
      'BioGrid',
      'ComplexPortal',
      'CORUM',
      'DIP',
      'ELM',
      'IntAct',
      'MINT',
      'STRING',
    ],
  ],
  [
    'CHEMISTRY',
    ['BindingDB', 'ChEMBL', 'DrugBank', 'GuidetoPHARMACOLOGY', 'SwissLipids'],
  ],
  [
    'PFAM',
    [
      'Allergome',
      'CAZy',
      'ESTHER',
      'IMGT_GENE-DB',
      'MEROPS',
      'MoonDB',
      'MoonProt',
      'mycoCLAP',
      'PeroxiBase',
      'REBASE',
      'TCDB',
      'UniLectin',
    ],
  ],
  [
    'PTM',
    [
      'CarbonylDB',
      'DEPOD',
      'GlyConnect',
      'iPTMnet',
      'PhosphoSitePlus',
      'SwissPalm',
      'UniCarbKB',
    ],
  ],
  ['PMD', ['BioMuta', 'DMDM', 'dbSNP']],
  [
    '2DG',
    [
      'COMPLUYEAST-2DPAGE',
      'DOSAC-COBS-2DPAGE',
      'OGP',
      'REPRODUCTION-2DPAGE',
      'SWISS-2DPAGE',
      'UCD-2DPAGE',
      'World-2DPAGE',
    ],
  ],
  [
    'PROTEOMIC',
    [
      'EPD',
      'MaxQB',
      'PaxDb',
      'PeptideAtlas',
      'PRIDE',
      'ProMEX',
      'ProteomicsDB',
      'TopDownProteomics',
      'jPOST',
    ],
  ],
  ['PAM', ['DNASU']],
  [
    'GMA',
    [
      'Ensembl',
      'EnsemblBacteria',
      'EnsemblFungi',
      'EnsemblMetazoa',
      'EnsemblPlants',
      'EnsemblProtists',
      'GeneDB',
      'GeneID',
      'Gramene',
      'KEGG',
      'PATRIC',
      'UCSC',
      'VectorBase',
      'WBParaSite',
    ],
  ],
  [
    'ORG',
    [
      'ArachnoServer',
      'Araport',
      'CGD',
      'ConoServer',
      'CTD',
      'dictyBase',
      'DisGeNET',
      'EchoBASE',
      'EcoGene',
      'euHCVdb',
      'EuPathDB',
      'FlyBase',
      'GeneCards',
      'GeneReviews',
      'H-InvDB',
      'HGNC',
      'HPA',
      'LegioList',
      'Leproma',
      'MaizeGDB',
      'MalaCards',
      'MGI',
      'MIM',
      'neXtProt',
      'OpenTargets',
      'Orphanet',
      'PharmGKB',
      'PomBase',
      'PseudoCAP',
      'RGD',
      'SGD',
      'TAIR',
      'TubercuList',
      'VGNC',
      'WormBase',
      'Xenbase',
      'ZFIN',
    ],
  ],
  [
    'PLG',
    [
      'eggNOG',
      'GeneTree',
      'HOGENOM',
      'HOVERGEN',
      'InParanoid',
      'KO',
      'OMA',
      'OrthoDB',
      'PhylomeDB',
      'TreeFam',
    ],
  ],
  [
    'EAP',
    [
      'BioCyc',
      'BRENDA',
      'Reactome',
      'SABIO-RK',
      'SignaLink',
      'SIGNOR',
      'UniPathway',
    ],
  ],
  [
    'OTHER',
    [
      'ChiTaRS',
      'EvolutionaryTrace',
      'GeneWiki',
      'GenomeRNAi',
      'PMAP-CutDB',
      'PRO',
    ],
  ],
  ['GEP', ['Bgee', 'CleanEx', 'CollecTF', 'ExpressionAtlas', 'Genevisible']],
  [
    'FMD',
    [
      'CDD',
      'Gene3D',
      'HAMAP',
      'InterPro',
      'PANTHER',
      'Pfam',
      'PIRSF',
      'PRINTS',
      'ProDom',
      'SFLD',
      'SMART',
      'SUPFAM',
      'TIGRFAMs',
      'PROSITE',
    ],
  ],
  ['OTG', ['GO']],
  ['PRM', ['Proteomes']],
  ['UNK', ['GlycoProtDB', 'ProtClustDB', 'PathwayCommons']],
];

export const expectedDatabaseNameToCategory = [
  ['EMBL', 'SEQ'],
  ['CCDS', 'SEQ'],
  ['PIR', 'SEQ'],
  ['RefSeq', 'SEQ'],
  ['UniGene', 'SEQ'],
  ['PDB', '3DS'],
  ['PDBsum', '3DS'],
  ['DisProt', '3DS'],
  ['ProteinModelPortal', '3DS'],
  ['SMR', '3DS'],
  ['BioGrid', 'PPI'],
  ['ComplexPortal', 'PPI'],
  ['CORUM', 'PPI'],
  ['DIP', 'PPI'],
  ['ELM', 'PPI'],
  ['IntAct', 'PPI'],
  ['MINT', 'PPI'],
  ['STRING', 'PPI'],
  ['BindingDB', 'CHEMISTRY'],
  ['ChEMBL', 'CHEMISTRY'],
  ['DrugBank', 'CHEMISTRY'],
  ['GuidetoPHARMACOLOGY', 'CHEMISTRY'],
  ['SwissLipids', 'CHEMISTRY'],
  ['Allergome', 'PFAM'],
  ['CAZy', 'PFAM'],
  ['ESTHER', 'PFAM'],
  ['IMGT_GENE-DB', 'PFAM'],
  ['MEROPS', 'PFAM'],
  ['MoonDB', 'PFAM'],
  ['MoonProt', 'PFAM'],
  ['mycoCLAP', 'PFAM'],
  ['PeroxiBase', 'PFAM'],
  ['REBASE', 'PFAM'],
  ['TCDB', 'PFAM'],
  ['UniLectin', 'PFAM'],
  ['CarbonylDB', 'PTM'],
  ['DEPOD', 'PTM'],
  ['GlyConnect', 'PTM'],
  ['iPTMnet', 'PTM'],
  ['PhosphoSitePlus', 'PTM'],
  ['SwissPalm', 'PTM'],
  ['UniCarbKB', 'PTM'],
  ['BioMuta', 'PMD'],
  ['DMDM', 'PMD'],
  ['dbSNP', 'PMD'],
  ['COMPLUYEAST-2DPAGE', '2DG'],
  ['DOSAC-COBS-2DPAGE', '2DG'],
  ['OGP', '2DG'],
  ['REPRODUCTION-2DPAGE', '2DG'],
  ['SWISS-2DPAGE', '2DG'],
  ['UCD-2DPAGE', '2DG'],
  ['World-2DPAGE', '2DG'],
  ['EPD', 'PROTEOMIC'],
  ['MaxQB', 'PROTEOMIC'],
  ['PaxDb', 'PROTEOMIC'],
  ['PeptideAtlas', 'PROTEOMIC'],
  ['PRIDE', 'PROTEOMIC'],
  ['ProMEX', 'PROTEOMIC'],
  ['ProteomicsDB', 'PROTEOMIC'],
  ['TopDownProteomics', 'PROTEOMIC'],
  ['jPOST', 'PROTEOMIC'],
  ['DNASU', 'PAM'],
  ['Ensembl', 'GMA'],
  ['EnsemblBacteria', 'GMA'],
  ['EnsemblFungi', 'GMA'],
  ['EnsemblMetazoa', 'GMA'],
  ['EnsemblPlants', 'GMA'],
  ['EnsemblProtists', 'GMA'],
  ['GeneDB', 'GMA'],
  ['GeneID', 'GMA'],
  ['Gramene', 'GMA'],
  ['KEGG', 'GMA'],
  ['PATRIC', 'GMA'],
  ['UCSC', 'GMA'],
  ['VectorBase', 'GMA'],
  ['WBParaSite', 'GMA'],
  ['ArachnoServer', 'ORG'],
  ['Araport', 'ORG'],
  ['CGD', 'ORG'],
  ['ConoServer', 'ORG'],
  ['CTD', 'ORG'],
  ['dictyBase', 'ORG'],
  ['DisGeNET', 'ORG'],
  ['EchoBASE', 'ORG'],
  ['EcoGene', 'ORG'],
  ['euHCVdb', 'ORG'],
  ['EuPathDB', 'ORG'],
  ['FlyBase', 'ORG'],
  ['GeneCards', 'ORG'],
  ['GeneReviews', 'ORG'],
  ['H-InvDB', 'ORG'],
  ['HGNC', 'ORG'],
  ['HPA', 'ORG'],
  ['LegioList', 'ORG'],
  ['Leproma', 'ORG'],
  ['MaizeGDB', 'ORG'],
  ['MalaCards', 'ORG'],
  ['MGI', 'ORG'],
  ['MIM', 'ORG'],
  ['neXtProt', 'ORG'],
  ['OpenTargets', 'ORG'],
  ['Orphanet', 'ORG'],
  ['PharmGKB', 'ORG'],
  ['PomBase', 'ORG'],
  ['PseudoCAP', 'ORG'],
  ['RGD', 'ORG'],
  ['SGD', 'ORG'],
  ['TAIR', 'ORG'],
  ['TubercuList', 'ORG'],
  ['VGNC', 'ORG'],
  ['WormBase', 'ORG'],
  ['Xenbase', 'ORG'],
  ['ZFIN', 'ORG'],
  ['eggNOG', 'PLG'],
  ['GeneTree', 'PLG'],
  ['HOGENOM', 'PLG'],
  ['HOVERGEN', 'PLG'],
  ['InParanoid', 'PLG'],
  ['KO', 'PLG'],
  ['OMA', 'PLG'],
  ['OrthoDB', 'PLG'],
  ['PhylomeDB', 'PLG'],
  ['TreeFam', 'PLG'],
  ['BioCyc', 'EAP'],
  ['BRENDA', 'EAP'],
  ['Reactome', 'EAP'],
  ['SABIO-RK', 'EAP'],
  ['SignaLink', 'EAP'],
  ['SIGNOR', 'EAP'],
  ['UniPathway', 'EAP'],
  ['ChiTaRS', 'OTHER'],
  ['EvolutionaryTrace', 'OTHER'],
  ['GeneWiki', 'OTHER'],
  ['GenomeRNAi', 'OTHER'],
  ['PMAP-CutDB', 'OTHER'],
  ['PRO', 'OTHER'],
  ['Bgee', 'GEP'],
  ['CleanEx', 'GEP'],
  ['CollecTF', 'GEP'],
  ['ExpressionAtlas', 'GEP'],
  ['Genevisible', 'GEP'],
  ['CDD', 'FMD'],
  ['Gene3D', 'FMD'],
  ['HAMAP', 'FMD'],
  ['InterPro', 'FMD'],
  ['PANTHER', 'FMD'],
  ['Pfam', 'FMD'],
  ['PIRSF', 'FMD'],
  ['PRINTS', 'FMD'],
  ['ProDom', 'FMD'],
  ['SFLD', 'FMD'],
  ['SMART', 'FMD'],
  ['SUPFAM', 'FMD'],
  ['TIGRFAMs', 'FMD'],
  ['PROSITE', 'FMD'],
  ['GO', 'OTG'],
  ['Proteomes', 'PRM'],
  ['GlycoProtDB', 'UNK'],
  ['ProtClustDB', 'UNK'],
  ['PathwayCommons', 'UNK'],
];

export const expectedEntrySectionToDatabaseCategoryOrder = [
  ['Expression', ['GEP', 'ORG']],
  ['Family & Domains', ['PLG', 'FMD']],
  ['Function', ['EAP', 'PFAM', 'CHEMISTRY']],
  ['Interaction', ['PPI', 'CHEMISTRY']],
  ['Names & Taxonomy', ['ORG', 'GMA']],
  ['Pathology & BioTech', ['ORG', 'CHEMISTRY', 'PMD', 'PFAM']],
  ['Protein Processing', ['PROTEOMIC', '2DG', 'PTM']],
  ['Sequence', ['SEQ', 'GMA']],
  ['Structure', ['3DS', 'OTHER']],
];
