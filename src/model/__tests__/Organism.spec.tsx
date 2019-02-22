import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Organism } from '../Organism';

configure({ adapter: new Adapter() });

describe('Organism', () => {
  test('should render organism', () => {
    const data = {
      organism: {
        scientificName: 'Dodo scientifacus',
        commonName: 'Lesser spotted dodo',
        synonyms: ['Flightless bird', "Darwin's pet"],
        taxonId: 1234,
      },
    };
    const wrapper = shallow(<Organism data={data} />);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
