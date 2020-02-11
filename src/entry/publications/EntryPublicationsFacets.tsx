import React from 'react';
import { Facets } from 'franklin-sites';
import { Facet } from '../../results/ResultsContainer';
import { SelectedFacet } from '../../results/types/resultsTypes';

const EntryPublicationsFacets: React.FC<{
  facets: Facet[];
  selectedFacets: SelectedFacet[];
  setSelectedFacets: (facets: SelectedFacet[]) => void;
}> = ({ facets, selectedFacets, setSelectedFacets }) => {
  const addFacet = (name: string, value: string) => {
    selectedFacets.find(facet => facet.name === name);
    setSelectedFacets([...selectedFacets, { name, value }]);
  };

  const removeFacet = (name: string, value: string) => {
    setSelectedFacets(
      selectedFacets.filter(
        selectedFacet =>
          !(selectedFacet.name === name && selectedFacet.value === value)
      )
    );
  };
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
