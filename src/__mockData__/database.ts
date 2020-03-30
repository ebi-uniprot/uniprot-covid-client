export const expectedDatabaseCategoryToNames = [
  ['SEQ', ['EMBL', 'GenBank', 'DDBJ', 'CCDS', 'PIR', 'RefSeq']],
  [
    '3DS',
    [
      'PDB',
      'PDBsum',
      'ModBase',
      'SMR',
      'SWISS-MODEL-Workspace',
      'PDBe-KB',
      'PDBj',
      'RCSB-PDB',
    ],
  ],
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
    [
      'BindingDB',
      'ChEMBL',
      'DrugBank',
      'GuidetoPHARMACOLOGY',
      'SwissLipids',
      'DrugCentral',
    ],
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
      'GPCRDB',
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
      'CPTAC',
      'EPD',
      'MaxQB',
      'PaxDb',
      'PeptideAtlas',
      'PRIDE',
      'ProMEX',
      'ProteomicsDB',
      'TopDownProteomics',
      'jPOST',
      'MassIVE',
    ],
  ],
  ['PAM', ['DNASU', 'ABCD']],
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
      'euHCVdb',
      'EuPathDB',
      'FlyBase',
      'GeneCards',
      'GeneReviews',
      'HGNC',
      'GenAtlas',
      'HPA',
      'LegioList',
      'Leproma',
      'MaizeGDB',
      'MalaCards',
      'MGI',
      'MIM',
      'NIAGADS',
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
      'HUGE',
      'ROUGE',
    ],
  ],
  [
    'PLG',
    [
      'eggNOG',
      'GeneTree',
      'HOGENOM',
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
      'PlantReactome',
      'ENZYME',
    ],
  ],
  [
    'OTHER',
    [
      'ChiTaRS',
      'EvolutionaryTrace',
      'GeneWiki',
      'GenomeRNAi',
      'PRO',
      'SOURCE_MIM',
      'SOURCE_MGI',
      'Pharos',
      'RNAct',
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
      'DisProt',
      'MobiDB',
      'ProtoNet',
    ],
  ],
  ['OTG', ['GO']],
  ['PRM', ['Proteomes']],
  ['UNK', ['PathwayCommons']],
];

export const expectedDatabaseNameToCategory = [
  ['EMBL', 'SEQ'],
  ['GenBank', 'SEQ'],
  ['DDBJ', 'SEQ'],
  ['CCDS', 'SEQ'],
  ['PIR', 'SEQ'],
  ['RefSeq', 'SEQ'],
  ['PDB', '3DS'],
  ['PDBsum', '3DS'],
  ['ModBase', '3DS'],
  ['SMR', '3DS'],
  ['SWISS-MODEL-Workspace', '3DS'],
  ['PDBe-KB', '3DS'],
  ['PDBj', '3DS'],
  ['RCSB-PDB', '3DS'],
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
  ['GPCRDB', 'PFAM'],
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
  ['CPTAC', 'PROTEOMIC'],
  ['EPD', 'PROTEOMIC'],
  ['MaxQB', 'PROTEOMIC'],
  ['PaxDb', 'PROTEOMIC'],
  ['PeptideAtlas', 'PROTEOMIC'],
  ['PRIDE', 'PROTEOMIC'],
  ['ProMEX', 'PROTEOMIC'],
  ['ProteomicsDB', 'PROTEOMIC'],
  ['TopDownProteomics', 'PROTEOMIC'],
  ['jPOST', 'PROTEOMIC'],
  ['MassIVE', 'PROTEOMIC'],
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
  ['euHCVdb', 'ORG'],
  ['EuPathDB', 'ORG'],
  ['FlyBase', 'ORG'],
  ['GeneCards', 'ORG'],
  ['GeneReviews', 'ORG'],
  ['HGNC', 'ORG'],
  ['GenAtlas', 'ORG'],
  ['HPA', 'ORG'],
  ['LegioList', 'ORG'],
  ['Leproma', 'ORG'],
  ['MaizeGDB', 'ORG'],
  ['MalaCards', 'ORG'],
  ['MGI', 'ORG'],
  ['MIM', 'ORG'],
  ['NIAGADS', 'ORG'],
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
  ['HUGE', 'ORG'],
  ['ROUGE', 'ORG'],
  ['eggNOG', 'PLG'],
  ['GeneTree', 'PLG'],
  ['HOGENOM', 'PLG'],
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
  ['PlantReactome', 'EAP'],
  ['ENZYME', 'EAP'],
  ['ChiTaRS', 'OTHER'],
  ['EvolutionaryTrace', 'OTHER'],
  ['GeneWiki', 'OTHER'],
  ['GenomeRNAi', 'OTHER'],
  ['PRO', 'OTHER'],
  ['SOURCE_MIM', 'OTHER'],
  ['SOURCE_MGI', 'OTHER'],
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
  ['DisProt', 'FMD'],
  ['MobiDB', 'FMD'],
  ['ProtoNet', 'FMD'],
  ['GO', 'OTG'],
  ['Proteomes', 'PRM'],
  ['PathwayCommons', 'UNK'],
  ['Pharos', 'OTHER'],
  ['DrugCentral', 'CHEMISTRY'],
  ['ABCD', 'PAM'],
  ['RNAct', 'OTHER'],
];

export const expectedEntrySectionToDatabaseCategoryOrder = [
  ['Expression', ['GEP', 'ORG']],
  ['Family & Domains', ['PLG', 'FMD', 'PFAM']],
  ['Function', ['EAP', 'PFAM', 'CHEMISTRY']],
  ['Interaction', ['PPI', 'CHEMISTRY']],
  ['Names & Taxonomy', ['ORG', 'GMA']],
  ['Pathology & BioTech', ['ORG', 'CHEMISTRY', 'PMD', 'PFAM']],
  ['Protein Processing', ['PROTEOMIC', '2DG', 'PTM']],
  ['Sequence', ['SEQ', 'GMA']],
  ['Structure', ['3DS', 'OTHER']],
  ['External Links', ['OTHER', 'PAM', 'ORG', '3DS']],
];