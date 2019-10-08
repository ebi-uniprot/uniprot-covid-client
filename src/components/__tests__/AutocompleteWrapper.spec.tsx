import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import AutocompleteWrapper from '../AutocompleteWrapper';
import { getSuggesterUrl } from '../../utils/apiUrls';
import { resetUuidV1 } from '../../../__mocks__/uuid';
import fetchData from '../../utils/fetchData';

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
    pathLabel: 'Homo sapiens (Human) [9606]',
    itemLabel: 'Homo sapiens (Human)',
    apiId: '9606',
    id: 0,
  },
  {
    pathLabel: 'Human rotavirus [1906931]',
    itemLabel: 'Human rotavirus',
    apiId: '1906931',
    id: 1,
  },
  {
    pathLabel: 'Human Bufavirus [1903319]',
    itemLabel: 'Human Bufavirus',
    apiId: '1903319',
    id: 2,
  },
  {
    pathLabel: 'Human pegivirus [1758225]',
    itemLabel: 'Human pegivirus',
    apiId: '1758225',
    id: 3,
  },
  {
    pathLabel: 'Human echovirus [1569923]',
    itemLabel: 'Human echovirus',
    apiId: '1569923',
    id: 4,
  },
  {
    pathLabel: 'Human cosavirus [1233383]',
    itemLabel: 'Human cosavirus',
    apiId: '1233383',
    id: 5,
  },
  {
    pathLabel: 'Human salivirus [1548189]',
    itemLabel: 'Human salivirus',
    apiId: '1548189',
    id: 6,
  },
  {
    pathLabel: 'Human DNA virus [1904876]',
    itemLabel: 'Human DNA virus',
    apiId: '1904876',
    id: 7,
  },
  {
    pathLabel: 'Human bocavirus [329641]',
    itemLabel: 'Human bocavirus',
    apiId: '329641',
    id: 8,
  },
  {
    pathLabel: 'Human orf virus [240708]',
    itemLabel: 'Human orf virus',
    apiId: '240708',
    id: 9,
  },
];
const suggesterBaseUrl = '/uniprot/api/suggester?dict=taxonomy&query=?';
const props = {
  title: 'Taxonomy [OC]',
  value: 'Homo sapiens (Human) [9606]',
  inputValue: 'human',
  url: suggesterBaseUrl,
  onSelect: jest.fn(),
};
const mock = new MockAdapter(axios);
mock.onGet(getSuggesterUrl(suggesterBaseUrl, 'human')).reply(200, response);

let rendered;
describe('Autocomplete Wrapper', () => {
  beforeEach(() => {
    resetUuidV1();
    rendered = render(<AutocompleteWrapper {...props} />);
  });

  test('should render', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should call fetchOptions on input change', () => {
    const { queryByTestId } = rendered;
    const searchInput = queryByTestId('search-input');
    const value = 'human';
    fireEvent.change(searchInput, { target: { value } });
    const suggesterUrl = getSuggesterUrl(suggesterBaseUrl, value);
    expect(fetchData).toHaveBeenCalledWith(suggesterUrl);
  });

  // test('should not call fetchOptions when input is less than minCharsToShowDropdown (=3)', () => {
  //   const fetchOptions = jest.spyOn(wrapper.instance(), 'fetchOptions');
  //   wrapper.find('[onChange]').simulate('change', 'hu');
  //   expect(fetchOptions).toHaveBeenCalledTimes(0);
  // });

  // test('should prepare API data for Autocomplete', () => {
  //   expect(AutocompleteWrapper.prepareData(response.suggestions)).toEqual(
  //     preparedSuggestions
  //   );
  // });
});
