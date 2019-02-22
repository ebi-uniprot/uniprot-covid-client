import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { GeneNames } from '../GeneNames';

configure({ adapter: new Adapter() });

describe('GeneNames', () => {
  test('should render gene_names', () => {
    const data = {
      genes: [
        {
          geneName: {
            value: 'My gene',
          },
          synonyms: [{ value: 'synonym 1' }, { value: 'synonym 2' }],
          orfNames: [
            { value: 'orfNames 1' },
            { value: 'orfNames 2' },
            { value: 'orfNames 3' },
          ],
        },
      ],
    };
    const wrapper = shallow(<GeneNames data={data} />);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
