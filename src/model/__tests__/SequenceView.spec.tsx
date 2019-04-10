import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { SequenceViewEntry, SequenceInfo } from '../SequenceView';
import data from './modelData.json';

configure({ adapter: new Adapter() });

describe('SequenceView component', () => {
  test('should render', () => {
    const wrapper = shallow(<SequenceViewEntry data={data} />);
    expect(wrapper).toMatchSnapshot();
  });
});

// TODO test for cases with and without ALTERNATIVE_PRODUCTS

// NOTE: Enzyme doesn't support hooks yet. We might need to switch
// to react-testing-library
// describe('SequenceInfo component', () => {
//   test('should render with provided sequence info (canonical)', () => {
//     const isoformSequenceData = {
//       value: 'ABCD',
//       length: 100,
//       molWeight: 100000,
//       crc64: 'ABCSSDDD',
//     };
//     const wrapper = shallow(
//       <SequenceInfo
//         isoformId="Isoform"
//         isoformSequence={isoformSequenceData}
//         lastUpdateDate="Some date"
//       />
//     );
//     expect(wrapper).toMatchSnapshot();
//   });
// });
