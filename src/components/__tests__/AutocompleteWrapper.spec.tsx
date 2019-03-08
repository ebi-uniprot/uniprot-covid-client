import React from 'react';
import { shallow, configure } from 'enzyme';

import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import AutocompleteWrapper from '../AutocompleteWrapper';
import { getSuggesterUrl } from '../../utils/apiUrls';

const mock = new MockAdapter(axios);
jest.mock('uuid/v1', () => () => 0);
configure({ adapter: new Adapter() });

const response = {
  query: 'human',
  dictionary: 'taxonomy',
  suggestions: [
    {
      value: 'Homo sapiens (Human)',
      id: '9606',
    },
    {
      value: 'Human rotavirus',
      id: '1906931',
    },
    {
      value: 'Human Bufavirus',
      id: '1903319',
    },
    {
      value: 'Human pegivirus',
      id: '1758225',
    },
    {
      value: 'Human echovirus',
      id: '1569923',
    },
    {
      value: 'Human cosavirus',
      id: '1233383',
    },
    {
      value: 'Human salivirus',
      id: '1548189',
    },
    {
      value: 'Human DNA virus',
      id: '1904876',
    },
    {
      value: 'Human bocavirus',
      id: '329641',
    },
    {
      value: 'Human orf virus',
      id: '240708',
    },
  ],
};

const preparedSuggestions = [
  {
    pathLabel: 'Homo sapiens (Human)',
    itemLabel: 'Homo sapiens (Human)',
    apiId: '9606',
    id: 0,
  },
  {
    pathLabel: 'Human rotavirus',
    itemLabel: 'Human rotavirus',
    apiId: '1906931',
    id: 0,
  },
  {
    pathLabel: 'Human Bufavirus',
    itemLabel: 'Human Bufavirus',
    apiId: '1903319',
    id: 0,
  },
  {
    pathLabel: 'Human pegivirus',
    itemLabel: 'Human pegivirus',
    apiId: '1758225',
    id: 0,
  },
  {
    pathLabel: 'Human echovirus',
    itemLabel: 'Human echovirus',
    apiId: '1569923',
    id: 0,
  },
  {
    pathLabel: 'Human cosavirus',
    itemLabel: 'Human cosavirus',
    apiId: '1233383',
    id: 0,
  },
  {
    pathLabel: 'Human salivirus',
    itemLabel: 'Human salivirus',
    apiId: '1548189',
    id: 0,
  },
  {
    pathLabel: 'Human DNA virus',
    itemLabel: 'Human DNA virus',
    apiId: '1904876',
    id: 0,
  },
  {
    pathLabel: 'Human bocavirus',
    itemLabel: 'Human bocavirus',
    apiId: '329641',
    id: 0,
  },
  {
    pathLabel: 'Human orf virus',
    itemLabel: 'Human orf virus',
    apiId: '240708',
    id: 0,
  },
];

const props = {
  title: 'Taxonomy [OC]',
  value: 'Homo sapiens (Human) [9606]',
  inputValue: 'human',
  url: '/uniprot/api/suggester?dict=taxonomy&query=?',
  onSelect: jest.fn(),
};

let wrapper;
describe('Autocomplete Wrapper', () => {
  beforeEach(() => {
    wrapper = shallow(<AutocompleteWrapper {...props} />);
  });

  test('should render', () => {
    expect(wrapper.debug()).toMatchSnapshot();
  });

  test('should call fetchOptions and handleSelect on input change', () => {
    const fetchOptions = jest.spyOn(wrapper.instance(), 'fetchOptions');
    const handleSelect = jest.spyOn(wrapper.instance(), 'handleSelect');
    const suggesterUrl = getSuggesterUrl(props.url, props.inputValue);
    wrapper.find('e').simulate('change', 'human');
    mock.onGet(suggesterUrl).reply(200, response);
    expect(fetchOptions).toHaveBeenCalled();
    expect(handleSelect).toHaveBeenCalled();
  });

  test('should prepare API data for Autocomplete', () => {
    expect(AutocompleteWrapper.prepareData(response.suggestions)).toEqual(
      preparedSuggestions
    );
  });
});
