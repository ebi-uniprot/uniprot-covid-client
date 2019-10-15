enum FeatureType {
  INIT_MET = 'initiator methionine',
  SIGNAL = 'signal peptide',
  PROPEP = 'propeptide',
  TRANSIT = 'transit peptide',
  CHAIN = 'chain',
  PEPTIDE = 'peptide',
  TOPO_DOM = 'topological domain',
  TRANSMEM = 'transmembrane region',
  INTRAMEM = 'intramembrane region',
  DOMAIN = 'Other domain of interest',
  REPEAT = 'repeat',
  CA_BIND = 'calcium-binding region',
  ZN_FING = 'zinc finger region',
  DNA_BIND = 'DNA-binding region',
  NP_BINDL = 'Nucleotide-binding region',
  REGION = 'region of interest',
  COILED = 'coiled-coil region',
  MOTIF = 'short sequence motif',
  COMPBIAS = 'compositionally biased region',
  ACT_SITE = 'active site',
  METAL = 'metal ion-binding site',
  BINDING = 'Other binding site',
  SITE = 'Other site of interest',
  NON_STD = 'non-standard amino acid',
  MOD_RES = 'Post-translationally modified residue',
  LIPID = 'lipid moiety-binding region',
  CARBOHYD = 'glycosylation site',
  DISULFID = 'disulfide bond',
  CROSSLNK = 'cross-link',
  VAR_SEQ = 'splice variant',
  VARIANT = 'Sequence variation',
  MUTAGEN = 'mutagenesis site',
  UNSURE = 'Uncertainty in sequence',
  CONFLICT = 'sequence conflict',
  NON_CONS = 'non-consecutive residues',
  NON_TER = 'non-terminal residue',
  HELIX = 'helix',
  TURN = 'turn',
  STRAND = 'strand',
}

export default FeatureType;