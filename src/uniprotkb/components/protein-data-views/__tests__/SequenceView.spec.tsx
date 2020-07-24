import React from 'react';
import { render } from '@testing-library/react';
import SequenceView, { SequenceInfo } from '../SequenceView';
import SequenceUIDataJson from './__mocks__/sequenceUIData.json';

// Don't want the prefix to be part of the url in those instances when pushing
// code for testing on backup machine
jest.mock('url-join', () => jest.fn((...args) => args.slice(1).join('/')));

describe('SequenceView component', () => {
  beforeEach(() => {
    window.SVGElement.prototype.getBBox = () => ({
      width: 10,
      height: 10,
    });
  });

  afterEach(() => {
    delete window.SVGElement.prototype.getBBox;
  });

  test('should render SequenceView', () => {
    const { asFragment } = render(
      <SequenceView data={SequenceUIDataJson} accession="P05067" />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render SequenceInfo with provided sequence info (canonical)', () => {
    const isoformSequenceData = {
      value: 'ABCD',
      length: 100,
      molWeight: 100000,
      crc64: 'ABCSSDDD',
    };
    const { asFragment } = render(
      <SequenceInfo
        isoformId="Isoform"
        isoformSequence={isoformSequenceData}
        lastUpdateDate="Some date"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
