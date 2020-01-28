import { Facet } from '../results/ResultsContainer';

type Response = {
  data: {
    results: [];
    facets: Facet[];
  };
  headers: {
    ['x-totalrecords']: number;
    link: string;
  };
};

export default Response;
