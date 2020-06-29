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
  const { scoreMin, scoreMax } = params;

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

  // const histogramSettings = {
  //   scores: {
  //     min: getSmallerMultiple(Math.min(...scores), binSize),
  //     max: getLargerMultiple(Math.max(...scores), binSize),
  //   },
  //   identities: {
  //     min: getSmallerMultiple(Math.min(...identities), binSize),
  //     max: getLargerMultiple(Math.max(...identities), binSize),
  //   },
  //   eValues: {
  //     min: getSmallerMultiple(Math.min(...eValues), binSize),
  //     max: getLargerMultiple(Math.max(...eValues), binSize),
  //   },
  // };

  const scoreFacetIndex = findFacet('score');
  let scoreFacetValue;
  let selectedScoreMin, selectedScoreMax;

  if (scoreFacetIndex > -1) {
    [selectedScoreMin, selectedScoreMax] = selectedFacets[
      scoreFacetIndex
    ].value.split('-');
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
                max={params.scores.max}
                min={params.scores.min}
                // max={scoreMin}
                // min={scoreMax}
                nBins={30}
                onChange={(e: number[]) => onBlastParamChange('score', e)}
                selectedRange={[
                  selectedScoreMin || params.scores.min,
                  selectedScoreMax || params.scores.max,
                ]}
                values={scores.values}
              />
            </li>
            <li>
              <span className="">Identity</span>
              <HistogramFilter
                height={50}
                max={params.identities.max}
                min={params.identities.min}
                nBins={30}
                onChange={(e: number[]) => onBlastParamChange('identities', e)}
                selectedRange={[params.identities.min, params.identities.max]}
                values={identities.values}
              />
            </li>
            <li>
              <span className="">E-value</span>
              <HistogramFilter
                height={50}
                max={params.eValues.max}
                min={params.eValues.min}
                nBins={30}
                onChange={(e: number[]) => onBlastParamChange('evalues', e)}
                selectedRange={[params.eValues.min, params.eValues.max]}
                values={eValues.values}
              />
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default BlastResultsParametersFacets;
