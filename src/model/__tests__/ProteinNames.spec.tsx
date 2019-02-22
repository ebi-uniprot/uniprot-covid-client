import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { ProteinNames } from '../ProteinNames';

configure({ adapter: new Adapter() });

describe('ProteinNames', () => {
  test('should render protein_name', () => {
    const data = {
      proteinDescription: {
        recommendedName: {
          fullName: {
            value: 'My protein',
          },
        },
        submissionNames: [
          {
            fullName: {
              value: 'A submission',
            },
          },
        ],
        shortNames: [
          {
            value: 'My prot',
          },
        ],
        ecNumbers: [
          {
            value: 'ec1234',
          },
        ],
        alternativeNames: [
          {
            fullName: {
              value: 'Some protein',
            },
          },
        ],
      },
    };
    const wrapper = shallow(<ProteinNames data={data} />);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
