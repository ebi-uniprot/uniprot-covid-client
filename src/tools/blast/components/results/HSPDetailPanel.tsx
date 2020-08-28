/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import React, { FC, useCallback, useEffect } from 'react';
import { Loader, CloseIcon } from 'franklin-sites';
import SlidingPanel from '../../../../shared/components/layouts/SlidingPanel';
import { BlastHsp } from '../../types/blastResults';
import useDataApi from '../../../../shared/hooks/useDataApi';
import { UniProtkbAPIModel } from '../../../../uniprotkb/adapters/uniProtkbConverter';
import { getAccessionsURL } from '../../../../uniprotkb/config/apiUrls';
import { processFeaturesData } from '../../../../uniprotkb/components/protein-data-views/FeaturesView';
import ErrorHandler from '../../../../shared/components/error-pages/ErrorHandler';
import './styles/HSPDetailPanel.scss';
import {
  getFullAlignmentLength,
  getFullAlignmentSegments,
  getOffset,
  transformFeaturesPositions,
} from '../../utils/hsp';
import MSAWrapper, { MSAInput } from '../../../components/MSAWrapper';

type UniProtkbAccessionsAPI = {
  results: UniProtkbAPIModel[];
};

export type HSPDetailPanelProps = {
  hsp: BlastHsp;
  hitAccession: string;
  extra?: UniProtkbAPIModel;
  onClose: () => void;
  hitLength: number;
  queryLength: number;
};

const HSPDetailPanel: FC<HSPDetailPanelProps> = ({
  hsp,
  hitAccession,
  onClose,
  hitLength,
  queryLength,
  extra,
}) => {
  const {
    hsp_align_len,
    hsp_query_from,
    hsp_qseq,
    hsp_hit_from,
    hsp_hseq,
  } = hsp;

  const tracksOffset = getOffset(hsp);
  const totalLength = getFullAlignmentLength(hsp, queryLength, hitLength);

  // TODO calculate actual length based on total match and query lengths
  const segments = getFullAlignmentSegments(hsp, queryLength, hitLength);
  // Reset view when different hit is being viewed
  // useEffect(() => {
  //   setActiveView(View.overview);
  //   setAnnotation(undefined);
  //   setHighlightProperty(undefined);
  // }, [hitAccession]);

  const { loading, data, status, error } = useDataApi<UniProtkbAccessionsAPI>(
    getAccessionsURL([hitAccession], { facets: [] })
  );

  const recommendedName =
    data?.results?.[0]?.proteinDescription?.recommendedName?.fullName.value;
  const organism = data?.results?.[0]?.organism?.scientificName;

  const title = [hitAccession, recommendedName, organism]
    .filter(Boolean)
    .join(' · ');

  const alignment: MSAInput[] = [
    {
      name: 'Query',
      sequence: hsp_qseq,
      from: hsp_query_from,
    },
    {
      name: 'Match',
      sequence: hsp_hseq,
      from: hsp_hit_from,
      accession: hitAccession,
      features: extra?.features,
    },
  ];

  if (error) {
    return <ErrorHandler status={status} />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <SlidingPanel position="bottom" className="hsp-detail-panel">
      <div className="hsp-detail-panel__header">
        <h4>{title}</h4>
        <button type="button" onClick={onClose}>
          <CloseIcon width="16" height="16" />
        </button>
      </div>
      <div className="hsp-detail-panel__body">
        <MSAWrapper
          tracksOffset={tracksOffset}
          alignmentLength={hsp_align_len}
          totalLength={totalLength}
          alignment={alignment}
        />
      </div>
    </SlidingPanel>
  );
};

export default HSPDetailPanel;
