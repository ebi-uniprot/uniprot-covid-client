import React, { FC, useMemo, Fragment } from 'react';
import { Loader } from 'franklin-sites';
import ResultsFacets from '../../../../uniprotkb/components/results/ResultsFacets';
import { EntryType } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import { Facet, FacetValue } from '../../../../uniprotkb/types/responseTypes';
import BlastResultsParametersFacets, {
  BlastParamFacet,
} from './BlastResultsParametersFacets';
import { EnrichedData } from './BlastResult';

const getFacetsFromData = (data?: EnrichedData | null): Facet[] => {
  const facets: Facet[] = [];
  if (!data || !data.hits.length) {
    return facets;
  }

  // status
  facets.push({
    label: 'Status',
    name: 'reviewed',
    allowMultipleSelection: false,
    values: [
      {
        label: 'Unreviewed (TrEMBL)',
        value: 'false',
        count: data.hits.filter(
          (hit) => hit.extra?.entryType === EntryType.TREMBL
        ).length,
      },
      {
        label: 'Reviewed (Swiss-Prot)',
        value: 'true',
        count: data.hits.filter(
          (hit) => hit.extra?.entryType === EntryType.SWISSPROT
        ).length,
      },
    ],
  });

  // organisms
  const organisms = new Map<string, FacetValue>();
  for (const { hit_uni_ox: value, hit_uni_os: label } of data.hits) {
    let organism = organisms.get(value);
    if (!organism) {
      // first time we see this organism
      organism = { label, value, count: 0 };
      organisms.set(value, organism);
    }
    organism.count += 1;
  }
  facets.push({
    label: 'Organisms',
    name: 'organism',
    allowMultipleSelection: true,
    values: Array.from(organisms.values()).sort((a, b) => b.count - a.count),
  });

  return facets;
};

const getBlastParametersFacetsFromData = (
  data?: EnrichedData | null
): BlastParamFacet => {
  const results: BlastParamFacet = {
    scores: [],
    identities: [],
    eValues: [],
  };

  if (!data) {
    return results;
  }

  data.hits.forEach(({ hit_hsps }) => {
    hit_hsps.forEach(({ hsp_score, hsp_identity, hsp_expect }) => {
      results.scores.push(hsp_score);
      results.identities.push(hsp_identity);
      results.eValues.push(hsp_expect);
    });
  });

  return results;
};

type Props = {
  loading: boolean;
  data?: EnrichedData | null;
  histogramBinSize: number;
};

const BlastResultSidebar: FC<Props> = (props) => {
  const { loading, data, histogramBinSize: binSize } = props;
  const facets = useMemo(() => getFacetsFromData(data), [data]);
  const params = useMemo(() => getBlastParametersFacetsFromData(data), [data]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Fragment>
      <ResultsFacets facets={facets} />
      <BlastResultsParametersFacets params={params} binSize={binSize} />
    </Fragment>
  );
};

export default BlastResultSidebar;
