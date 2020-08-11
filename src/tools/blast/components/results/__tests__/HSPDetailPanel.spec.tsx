import React from 'react';
import { fireEvent } from '@testing-library/react';
import blastResultsMockData from '../../../../__mocks__/server-jobs/example-truncated.json';
import HSPDetailPanel, {
  filterFeaturesOutsideOfAlignment,
} from '../HSPDetailPanel';
import modelData from '../../../../../uniprotkb/__mocks__/entryModelData.json';
import renderWithRouter from '../../../../../shared/__test-helpers__/RenderWithRouter';

jest.mock('../../../../../shared/hooks/useDataApi', () => jest.fn());
import useDataApi from '../../../../../shared/hooks/useDataApi';

const dataMock = {
  loading: false,
  data: modelData,
};
useDataApi.mockImplementation(() => dataMock);

describe('HSPDetailPanel', () => {
  let rendered;
  const onClose = jest.fn();
  const hit = blastResultsMockData.hits[0];
  const hsp = hit.hit_hsps[0];

  beforeEach(async () => {
    rendered = renderWithRouter(
      <HSPDetailPanel
        hsp={hsp}
        hitAccession={hit.hit_acc}
        onClose={onClose}
        hitLength={hit.hit_len}
        queryLength={blastResultsMockData.query_len}
      />
    );
    await rendered;
  });

  it('should initially render overview', () => {
    const { asFragment, getByTestId } = rendered;
    expect(getByTestId('overview-hsp-detail')).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });

  it('should load correct query and match sequence data', async () => {
    const { container } = rendered;
    const msa = container.querySelector('protvista-msa');
    expect(msa.data).toEqual([
      { name: 'Query', sequence: hsp.hsp_qseq },
      { name: 'Match', sequence: hsp.hsp_hseq },
    ]);
  });

  it('should change to wrapped and render when wrapped view is clicked', async () => {
    const { getByText, getByTestId, asFragment } = rendered;
    const wrappedButton = getByText('Wrapped');
    fireEvent.click(wrappedButton);
    expect(getByTestId('wrapped-hsp-detail')).toBeTruthy();
    expect(asFragment()).toMatchSnapshot();
  });
});

describe('filterFeaturesOutsideOfAlignment', () => {
  it('should remove all features outside of the query/match alignment', () => {
    const filtered = filterFeaturesOutsideOfAlignment(
      [
        {
          protvistaFeatureId: '60f6f7b0-dbab-11ea-b5c1-ed65ca4c7436',
          start: 324,
          end: 344,
          startModifier: 'EXACT',
          endModifier: 'EXACT',
          type: 'coiled-coil region',
          description: '',
          evidences: [
            { evidenceCode: 'ECO:0000256', source: 'SAM', id: 'Coils' },
          ],
        },
        {
          protvistaFeatureId: '60f6f7b1-dbab-11ea-b5c1-ed65ca4c7436',
          start: 350,
          end: 384,
          startModifier: 'EXACT',
          endModifier: 'EXACT',
          type: 'coiled-coil region',
          description: '',
          evidences: [
            { evidenceCode: 'ECO:0000256', source: 'SAM', id: 'Coils' },
          ],
        },
        {
          protvistaFeatureId: '60f6f7b2-dbab-11ea-b5c1-ed65ca4c7436',
          start: 480,
          end: 500,
          startModifier: 'EXACT',
          endModifier: 'EXACT',
          type: 'coiled-coil region',
          description: '',
          evidences: [
            { evidenceCode: 'ECO:0000256', source: 'SAM', id: 'Coils' },
          ],
        },
      ],
      18,
      305
    );
    expect(filtered).toEqual([]);
  });
});
