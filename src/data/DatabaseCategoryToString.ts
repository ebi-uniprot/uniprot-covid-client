import DatabaseCategory from './DatabaseCategory';

const databaseCategoryToDatabases = new Map<DatabaseCategory, string>([
  [DatabaseCategory.SEQUENCE, 'Sequence databases'],
  [DatabaseCategory.STRUCTURE, '3D structure databases'],
  [DatabaseCategory.INTERACTION, 'Protein-protein interaction databases'],
  [DatabaseCategory.CHEMISTRY, 'Chemistry'],
  [DatabaseCategory.FAMILY, 'Protein family/group databases'],
  [DatabaseCategory.PTM, 'PTM databases'],
  [DatabaseCategory.POLYMORPHISM, 'Polymorphism and mutation databases'],
  [DatabaseCategory.GEL, '2D gel databases'],
  [DatabaseCategory.PROTEOMIC, 'Proteomic databases'],
  [DatabaseCategory.PROTOCOL, 'Protocols and materials databases'],
  [DatabaseCategory.GENOME, 'Genome annotation databases'],
  [DatabaseCategory.ORGANISM, 'Organism-specific databases'],
  [DatabaseCategory.PHYLOGENOMIC, 'Phylogenomic databases'],
  [DatabaseCategory.PATHWAY, 'Enzyme and pathway databases'],
  [DatabaseCategory.EXPRESSION, 'Gene expression databases'],
  [DatabaseCategory.DOMAIN, 'Family and domain databases'],
  [DatabaseCategory.OTHER, 'Other'],
]);

export default databaseCategoryToDatabases;
