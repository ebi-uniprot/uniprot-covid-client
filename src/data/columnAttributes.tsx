const small = 200; //10rem;
const medium = 400; //15rem;
const large = 600; //20rem;

const columnAttributes = {
  accession: {
    width: small,
    label: 'Entry',
  },
  id: {
    width: small,
    label: 'Entry Name',
  },
  protein_name: {
    width: large,
    label: 'Protein names',
  },
  gene_names: {
    width: medium,
    label: 'Gene Names',
  },
  organism: {
    width: large,
    label: 'Organism',
  },
};

export default columnAttributes;
