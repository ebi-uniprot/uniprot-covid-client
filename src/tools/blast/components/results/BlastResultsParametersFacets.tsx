import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { HistogramFilter } from 'franklin-sites';
import {
  getLocationObjForParams,
  getParamsFromURL,
} from '../../../../uniprotkb/utils/resultsUtils';
import {
  getSmallerMultiple,
  getLargerMultiple,
} from '../../../../shared/utils/utils';

export type BlastParamFacet = {
  scores: number[];
  identities: number[];
  eValues: number[];
};

type Props = { params: BlastParamFacet; binSize: number };

const BlastResultsParametersFacets: FC<Props> = ({ params, binSize }) => {
  const { scores, identities, eValues } = params;

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
        sortDirection
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
        sortDirection
      )
    );
  };

  const onBlastParamChange = (paramName: string, values: number[]) => {
    addFacet(paramName, values.join('-'));
  };

  const histogramSettings = {
    scores: {
      min: getSmallerMultiple(Math.min(...scores), binSize),
      max: getLargerMultiple(Math.max(...scores), binSize),
    },
    identities: {
      min: getSmallerMultiple(Math.min(...identities), binSize),
      max: getLargerMultiple(Math.max(...identities), binSize),
    },
    eValues: {
      min: getSmallerMultiple(Math.min(...eValues), binSize),
      max: getLargerMultiple(Math.max(...eValues), binSize),
    },
  };

  const scoreFacetIndex = findFacet('score');
  let scoreFacetValue;
  let scoreMin, scoreMax;

  if (scoreFacetIndex > -1) {
    [scoreMin, scoreMax] = selectedFacets[scoreFacetIndex].value.split('-');
  }

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
                max={histogramSettings.scores.max}
                min={histogramSettings.scores.min}
                nBins={30}
                onChange={(e: number[]) => onBlastParamChange('score', e)}
                selectedRange={[
                  scoreMin || histogramSettings.scores.min,
                  scoreMax || histogramSettings.scores.max,
                ]}
                values={scores}
              />
            </li>
            <li>
              <span className="">Identity</span>
              <HistogramFilter
                height={50}
                max={histogramSettings.identities.max}
                min={histogramSettings.identities.min}
                nBins={30}
                onChange={(e: number[]) => onBlastParamChange('identities', e)}
                selectedRange={[
                  histogramSettings.identities.min,
                  histogramSettings.identities.max,
                ]}
                values={identities}
              />
            </li>
            <li>
              <span className="">E-value</span>
              <HistogramFilter
                height={50}
                max={histogramSettings.eValues.max}
                min={histogramSettings.eValues.min}
                nBins={30}
                onChange={(e: number[]) => onBlastParamChange('evalues', e)}
                selectedRange={[
                  histogramSettings.eValues.min,
                  histogramSettings.eValues.max,
                ]}
                values={scores}
              />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default BlastResultsParametersFacets;
