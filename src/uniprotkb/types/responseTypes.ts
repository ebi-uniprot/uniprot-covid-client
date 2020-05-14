export type Facet = {
  label: string;
  name: string;
  allowMultipleSelection: boolean;
  values: { label: string; value: string; count: number }[];
};

type Response = {
  data: {
    results: [];
    facets: Facet[];
  };
  headers: {
    ['x-totalrecords']: string;
    link: string;
  };
};

export default Response;
