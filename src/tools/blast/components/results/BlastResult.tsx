import React, { useMemo, useEffect, useState, lazy, Suspense } from 'react';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { Loader, PageIntro, Tabs, Tab } from 'franklin-sites';

import { identity } from 'lodash-es';
import SideBarLayout from '../../../../shared/components/layouts/SideBarLayout';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import BlastResultSidebar from './BlastResultSidebar';
// import BlastResultDownload from './BlastResultDownload';
import BlastResultsButtons from './BlastResultsButtons';

import useDataApi, {
  UseDataAPIState,
} from '../../../../shared/hooks/useDataApi';
import {
  getLocationObjForParams,
  getParamsFromURL,
} from '../../../../uniprotkb/utils/resultsUtils';
import {
  getSmallerMultiple,
  getLargerMultiple,
} from '../../../../shared/utils/utils';
import { SelectedFacet } from '../../../../uniprotkb/types/resultsTypes';
import { BlastParamFacet } from './BlastResultsParametersFacets';

import inputParamsXMLToObject from '../../adapters/inputParamsXMLToObject';

import { Location, LocationToPath } from '../../../../app/config/urls';
import blastUrls from '../../config/blastUrls';
import { getAPIQueryUrl } from '../../../../uniprotkb/config/apiUrls';

import { BlastResults, BlastHit } from '../../types/blastResults';
import Response from '../../../../uniprotkb/types/responseTypes';
import { PublicServerParameters } from '../../types/blastServerParameters';
// what we import are types, even if they are in adapter file
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';

const BlastResultTable = lazy(() =>
  import(/* webpackChunkName: "blast-result-page" */ './BlastResultTable')
);
const BlastResultTaxonomy = lazy(() =>
  import(
    /* webpackChunkName: "blast-result-taxonomy" */ './BlastResultTaxonomy'
  )
);
const BlastResultTextOutput = lazy(() =>
  import(
    /* webpackChunkName: "blast-result-text-output" */ './BlastResultTextOutput'
  )
);
const BlastResultToolInput = lazy(() =>
  import(
    /* webpackChunkName: "blast-result-tool-input" */ './BlastResultToolInput'
  )
);
const BlastResultHitDistribution = lazy(() =>
  import(
    /* webpackChunkName: "blast-result-hit-distribution" */ './BlastResultHitDistribution'
  )
);

enum TabLocation {
  Overview = 'overview',
  Taxonomy = 'taxonomy',
  HitDistribution = 'hit-distribution',
  TextOutput = 'text-output',
  ToolInput = 'tool-input',
}

type Match = {
  params: {
    id: string;
    subPage?: string;
  };
};

// custom hook to get data from the input parameters endpoint, input sequence
// then parse it and merge it.
// This is kinda 'faking' useDataApi for the kind of object it outputs
const useParamsData = (
  id: string
): Partial<UseDataAPIState<PublicServerParameters>> => {
  const [paramsData, setParamsData] = useState<
    Partial<UseDataAPIState<PublicServerParameters>>
  >({});

  const paramsXMLData = useDataApi<string>(
    blastUrls.resultUrl(id, 'parameters')
  );
  const sequenceData = useDataApi<string>(blastUrls.resultUrl(id, 'sequence'));

  useEffect(() => {
    const loading = paramsXMLData.loading || sequenceData.loading;
    const error = paramsXMLData.error || sequenceData.error;
    const status = paramsXMLData.status || sequenceData.status;
    if (loading) {
      setParamsData({ loading });
    } else if (error) {
      setParamsData({ loading, error, status });
    } else if (paramsXMLData.data && sequenceData.data) {
      setParamsData({
        loading,
        data: inputParamsXMLToObject(paramsXMLData.data, sequenceData.data),
      });
    }
  }, [paramsXMLData, sequenceData]);

  return paramsData;
};

enum BlastFacets {
  SCORE = 'score',
  IDENTITIES = 'identities',
  EVALUES = 'evalues',
}

const blastFacetToKeyName = {
  [BlastFacets.SCORE]: 'hsp_score',
  [BlastFacets.IDENTITIES]: 'hsp_identity',
  [BlastFacets.EVALUES]: 'hsp_expect',
};

const filterResultsByBlastFacet = (hits, min, max, facet) => {
  return hits.filter((hit) => {
    return hit.hit_hsps
      .map((hsp) => hsp[blastFacetToKeyName[facet]])
      .filter((score) => score >= min && score <= max).length;
  });
};

const filterResultsByBlastFacets = (data, facets) => {
  if (!data) {
    return null;
  }

  if (!data.hits || !data.hits.length || !Object.keys(facets).length) {
    return data;
  }

  let { hits } = data;

  facets.forEach(({ name: facet, value }) => {
    if (facet in blastFacetToKeyName) {
      const [min, max] = value.split('-');
      hits = filterResultsByBlastFacet(hits, min, max, facet);
    }
  });

  return {
    ...data,
    hits,
    alignments: hits.length,
  };
};

const getEnrichApiUrl = (blastData?: BlastResults) => {
  if (!blastData || blastData.length === 0) {
    return null;
  }

  return getAPIQueryUrl(
    blastData.hits.map((hit) => `(accession:${hit.hit_acc})`).join(' OR '),
    undefined,
    undefined,
    undefined,
    undefined,
    [],
    blastData.hits.length
  );
};

// probably going to change with the custom endpoint to enrich data, so keep it
// here for now, enventually might be a new type in a type folder
export interface EnrichedData extends BlastResults {
  hits: Array<BlastHit & { extra?: UniProtkbAPIModel }>;
}

const enrich = (
  blastData?: BlastResults,
  apiData?: Response['data']
): EnrichedData | null => {
  if (!(blastData && apiData)) {
    return null;
  }
  const output: EnrichedData = { ...blastData };
  output.hits = output.hits.map((hit) => ({
    ...hit,
    extra: (apiData.results as UniProtkbAPIModel[]).find(
      (entry) => hit.hit_acc === entry.primaryAccession
    ),
  }));
  return output;
};

const histogramBinSize = 100;

const getBlastParametersFacetsFromData = (
  facets: SelectedFacet[],
  activeFacet: string,
  data?: BlastResults | null
) => {
  const results = {
    score: {
      values: [],
      min: undefined,
      max: undefined,
    },
    identities: {
      values: [],
      min: undefined,
      max: undefined,
    },
    evalues: {
      values: [],
      min: undefined,
      max: undefined,
    },
  };

  if (!data) {
    return results;
  }

  const parsedFacets = Object.fromEntries(
    facets.map(({ name, value }) => {
      const [min, max] = value.split('-').map((x) => parseInt(x, 10));
      return [name, { min, max }];
    })
  );

  data.hits.forEach(({ hit_hsps }) => {
    hit_hsps.forEach((hsp) => {
      Object.values(BlastFacets).forEach((facet) => {
        const value = hsp[blastFacetToKeyName[facet]];
        if (facet === activeFacet || !(facet in parsedFacets)) {
          results[facet].values.push(value);
        } else if (facet in parsedFacets) {
          const { min, max } = parsedFacets[facet];
          if (min <= value && value <= max) {
            results[facet].values.push(value);
          }
        }
      });
    });
  });
  for (const [key, { values }] of Object.entries(results)) {
    results[key].min = getSmallerMultiple(
      Math.min(...values),
      histogramBinSize
    );
    results[key].max = getLargerMultiple(Math.max(...values), histogramBinSize);
  }
  console.log(results);
  return results;
};

const BlastResult = () => {
  const history = useHistory();
  const match = useRouteMatch(LocationToPath[Location.BlastResult]) as Match;
  const location = useLocation();

  const [selectedEntries, setSelectedEntries] = useState<string[]>([]);
  const [urlParams, setUrlParams] = useState<any>({});
  const [originalBlastParamFacets, setOriginalBlastParamFacets] = useState<any>(
    {}
  );

  // data from blast
  const {
    loading: blastLoading,
    data: blastData,
    error: blastError,
    status: blastStatus,
  } = useDataApi<BlastResults>(
    blastUrls.resultUrl(match.params.id, 'jdp?format=json')
  );

  useEffect(() => {
    // TODO: investigate why /overview keeps recursively appended
    if (!match.params.subPage) {
      history.replace(
        history.createHref({
          ...history.location,
          pathname: `${history.location.pathname}/overview`,
        })
      );
    }
  }, [match.params.subPage, history]);

  useEffect(() => {
    setUrlParams(getParamsFromURL(location.search));
  }, [location.search, blastData]);

  // BLAST results filtered by BLAST facets (ie score, e-value, identity)
  const filteredBlastData = filterResultsByBlastFacets(
    blastData,
    urlParams.selectedFacets
  );

  // corresponding data from API
  const { loading: apiLoading, data: apiData } = useDataApi<Response['data']>(
    useMemo(() => getEnrichApiUrl(filteredBlastData), [filteredBlastData])
  );

  const data = useMemo(() => enrich(filteredBlastData, apiData), [
    filteredBlastData,
    apiData,
  ]);

  const inputParamsData = useParamsData(match.params.id);

  // Note: this function is duplicated in ResultsContainer.tsx
  const handleSelectedEntries = (rowId: string) => {
    const filtered = selectedEntries.filter((id) => id !== rowId);
    setSelectedEntries(
      filtered.length === selectedEntries.length
        ? [...selectedEntries, rowId]
        : filtered
    );
  };

  const histogramSettings = useMemo(
    () =>
      getBlastParametersFacetsFromData(
        urlParams.selectedFacets,
        urlParams.activeFacet,
        blastData
      ),
    [blastData]
  );

  if (blastLoading) {
    return <Loader />;
  }

  if (blastError || !blastData) {
    return <ErrorHandler status={blastStatus} />;
  }

  // Deciding what should be displayed on the sidebar
  const facetsSidebar = (
    <BlastResultSidebar
      loading={apiLoading}
      data={data}
      histogramSettings={histogramSettings}
      histogramBinSize={histogramBinSize}
    />
  );

  const emptySidebar = (
    <div className="sidebar-layout__sidebar-content--empty" />
  );
  let sidebar;

  switch (match.params.subPage) {
    case TabLocation.TextOutput:
    case TabLocation.ToolInput:
      sidebar = emptySidebar;
      break;

    default:
      sidebar = facetsSidebar;
      break;
  }

  return (
    <SideBarLayout
      title={
        <PageIntro title="BLAST Results" resultsCount={blastData.hits.length} />
      }
      sidebar={sidebar}
    >
      <Tabs active={match.params.subPage}>
        <Tab
          id="overview"
          title={
            <Link to={`/blast/${match.params.id}/overview`}>Overview</Link>
          }
        >
          <BlastResultsButtons
            jobId={match.params.id}
            selectedEntries={selectedEntries}
          />
          <Suspense fallback={<Loader />}>
            <BlastResultTable
              data={data}
              selectedEntries={selectedEntries}
              handleSelectedEntries={handleSelectedEntries}
            />
          </Suspense>
        </Tab>
        <Tab
          id="taxonomy"
          title={
            <Link to={`/blast/${match.params.id}/taxonomy`}>Taxonomy</Link>
          }
        >
          <BlastResultsButtons
            jobId={match.params.id}
            selectedEntries={selectedEntries}
          />
          <BlastResultTaxonomy data={data} />
        </Tab>
        <Tab
          id="hit-distribution"
          title={
            <Link to={`/blast/${match.params.id}/hit-distribution`}>
              Hit Distribution
            </Link>
          }
        >
          <BlastResultsButtons
            jobId={match.params.id}
            selectedEntries={selectedEntries}
          />
          <BlastResultHitDistribution
            hits={blastData.hits}
            binSize={histogramBinSize}
          />
        </Tab>
        <Tab
          id="text-output"
          title={
            <Link to={`/blast/${match.params.id}/text-output`}>
              Text Output
            </Link>
          }
        >
          <Suspense fallback={<Loader />}>
            <BlastResultTextOutput id={match.params.id} />
          </Suspense>
        </Tab>
        <Tab
          id="tool-input"
          title={
            <Link to={`/blast/${match.params.id}/tool-input`}>Tool Input</Link>
          }
        >
          <Suspense fallback={<Loader />}>
            <BlastResultToolInput
              id={match.params.id}
              inputParamsData={inputParamsData}
            />
          </Suspense>
        </Tab>
      </Tabs>
    </SideBarLayout>
  );
};

export default BlastResult;
