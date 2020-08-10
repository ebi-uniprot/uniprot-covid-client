import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import blastResultsMockData from '../../../../__mocks__/server-jobs/example-truncated.json';
import HSPDetailPanel from '../HSPDetailPanel';

describe('HSPDetailPanel tests', () => {
  let rendered;
  const onClose = jest.fn();
  beforeEach(() => {
    const hit = blastResultsMockData.hits[0];
    rendered = render(
      <HSPDetailPanel
        hsp={hit.hit_hsps[0]}
        hitAccession={hit.hit_acc}
        onClose={onClose}
        hitLength={hit.hit_len}
        queryLength={blastResultsMockData.query_len}
      />
    );
  });

  it('should render the results table', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  // it('should toggle the extra hss', async () => {
  //   const { getByText, findAllByTestId } = component;
  //   let hspTracks = await findAllByTestId('blast-summary-track');
  //   expect(hspTracks.length).toBe(1);
  //   const toggle = getByText('+1 more');
  //   fireEvent.click(toggle);
  //   hspTracks = await findAllByTestId('blast-summary-track');
  //   expect(hspTracks.length).toBe(2);
  // });
});
