import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UniProtEvidenceTag from '../UniProtEvidenceTag';

configure({ adapter: new Adapter() });

const evidence = {
  evidenceCode: 'ECO:0000255',
  source: 'PROSITE-ProRule',
  id: 'PRU10023',
};

describe('UniProtEvidenceTag components', () => {
  test('should render', () => {
    const wrapper = shallow(<UniProtEvidenceTag evidence={evidence} />);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
