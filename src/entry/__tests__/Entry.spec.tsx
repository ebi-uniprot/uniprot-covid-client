import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Entry from '../Entry';
import useDataApi from '../../utils/useDataApi';
import mock_data from '../../model/__tests__/modelData.json';

jest.mock('../../utils/useDataApi', () =>
  jest.fn().mockImplementation(() => mock_data)
);

configure({ adapter: new Adapter() });

describe('Entry', () => {
  test('should render', () => {
    const props = {
      match: {
        params: {
          accession: 'P050567',
        },
      },
    };
    const wrapper = shallow(<Entry.WrappedComponent {...props} />);
    expect(wrapper).toMatchSnapshot();
    expect(useDataApi).toBeCalled();
  });
});
