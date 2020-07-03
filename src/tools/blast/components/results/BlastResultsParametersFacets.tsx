import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { HistogramFilter } from 'franklin-sites';
import {
  getLocationObjForParams,
  getParamsFromURL,
} from '../../../../uniprotkb/utils/resultsUtils';
import { BlastHitFacetParameters } from '../../utils/blastFacetDataUtils';

const BlastResultsParametersFacets: FC<BlastHitFacetParameters> = ({
  score,
  identity,
  evalue,
}) => {
  const {
    push,
    location: { search: queryParamFromUrl, pathname },
  } = useHistory();
  const { query, selectedFacets, sortColumn, sortDirection } = getParamsFromURL(
    queryParamFromUrl
  );

  const findFacet = (facetName: string): number => {
    const index = selectedFacets.findIndex(
      (selectedFacet) => selectedFacet.name === facetName
    );

    return index;
  };

  const hasFacet = (facetName: string): boolean => {
    const facetIndex = findFacet(facetName);

    if (facetIndex > -1) {
      return true;
    }

    return false;
  };

  const updateFacet = (facetName: string, facetValue: string): void => {
    const facetIndex = findFacet(facetName);

    selectedFacets[facetIndex].value = facetValue;

    push(
      getLocationObjForParams(
        pathname,
        query,
        selectedFacets,
        sortColumn,
        sortDirection,
        facetName
      )
    );
  };

  const addFacet = (facetName: string, facetValue: string): void => {
    const facet = { name: facetName, value: facetValue };

    if (hasFacet(facetName)) {
      updateFacet(facetName, facetValue);
      return;
    }

    push(
      getLocationObjForParams(
        pathname,
        query,
        [...selectedFacets.concat(facet)],
        sortColumn,
        sortDirection,
        facetName
      )
    );
  };

  const onBlastParamChange = (paramName: string, values: number[]) => {
    addFacet(paramName, values.join('-'));
  };

  const selectedMinMaxValues = {
    score: {
      min: score.min,
      max: score.max,
    },
    identity: {
      min: identity.min,
      max: identity.max,
    },
    evalue: {
      min: evalue.min,
      max: evalue.max,
    },
  };

  Object.keys(selectedMinMaxValues).forEach((facet) => {
    const index = findFacet(facet);

    if (index > -1) {
      const [min, max] = selectedFacets[index].value.split('-');

      selectedMinMaxValues[facet as 'score' | 'identity' | 'evalue'] = {
        min: Number(min),
        max: Number(max),
      };
    }
  });

  return (
    <div className="blast-parameters-facet">
      <ul className="no-bullet">
        <li>
          <span className="facet-name">Blast parameters</span>
          <ul className="expandable-list no-bullet">
            <li>
              <span className="">Score</span>
              <HistogramFilter
                height={50}
                max={score.max}
                min={score.min}
                nBins={30}
                onChange={(e: number[]) => onBlastParamChange('score', e)}
                selectedRange={[
                  selectedMinMaxValues.score.min,
                  selectedMinMaxValues.score.max,
                ]}
                values={score.values}
              />
            </li>
            <li>
              <span className="">Identity</span>
              <HistogramFilter
                height={50}
                max={identity.max}
                min={identity.min}
                nBins={30}
                onChange={(e: number[]) => onBlastParamChange('identity', e)}
                selectedRange={[
                  selectedMinMaxValues.identity.min,
                  selectedMinMaxValues.identity.max,
                ]}
                values={identity.values}
              />
            </li>
            <li>
              <span className="">E-value</span>
              <HistogramFilter
                height={50}
                max={evalue.max}
                min={evalue.min}
                nBins={30}
                onChange={(e: number[]) => onBlastParamChange('evalue', e)}
                selectedRange={[
                  selectedMinMaxValues.evalue.min,
                  selectedMinMaxValues.evalue.max,
                ]}
                values={evalue.values}
              />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default BlastResultsParametersFacets;
