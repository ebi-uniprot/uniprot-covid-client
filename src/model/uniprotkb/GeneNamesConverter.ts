import { GeneNamesData } from './sections/NamesAndTaxonomyConverter';

export const convertGeneNames = (data: GeneNamesData) => {
  const names: string[] = [];
  const alternativeNames: string[] = [];
  if (data) {
    data.forEach(gene => {
      if (gene.geneName) {
        names.push(gene.geneName.value);
      }
      if (gene.synonyms) {
        alternativeNames.push(...gene.synonyms.map(syn => syn.value));
      }
      if (gene.orfNames) {
        alternativeNames.push(...gene.orfNames.map(orf => orf.value));
      }
    });
  }
  const nameString = names.join(', ');
  return { alternativeNames, name: nameString };
};
