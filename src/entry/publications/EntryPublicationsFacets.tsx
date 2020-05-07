import React from 'react';
import { Facets, Loader } from 'franklin-sites';
import { SelectedFacet } from '../../results/types/resultsTypes';
import { getUniProtPublicationsQueryUrl } from '../../utils/apiUrls';
import useDataApi from '../../hooks/useDataApi';
import ErrorHandler from '../../pages/errors/ErrorHandler';

const EntryPublicationsFacets: React.FC<{
  accession: string;
  selectedFacets: SelectedFacet[];
  setSelectedFacets: (facets: SelectedFacet[]) => void;
}> = ({ accession, selectedFacets, setSelectedFacets }) => {
  // TODO are these working? we should use the url anyway.
  const url = getUniProtPublicationsQueryUrl(accession, selectedFacets);
  const { loading, data, status, error } = useDataApi(url);

  const addFacet = (name: string, value: string) => {
    setSelectedFacets([...selectedFacets, { name, value }]);
  };

  const removeFacet = (name: string, value: string) => {
    setSelectedFacets(
      selectedFacets.filter(
        (selectedFacet) =>
          !(selectedFacet.name === name && selectedFacet.value === value)
      )
    );
  };

  if (error) {
    return <ErrorHandler status={status} />;
  }

  if (loading || !data) {
    return <Loader />;
  }

  const { facets } = data;

  return (
    <Facets
      data={facets}
      addFacet={addFacet}
      removeFacet={removeFacet}
      selectedFacets={selectedFacets}
    />
  );
};

export default EntryPublicationsFacets;
