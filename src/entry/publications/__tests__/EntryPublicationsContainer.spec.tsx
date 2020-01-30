import React from 'react';
import MockAdapter from 'axios-mock-adapter';
import { act } from 'react-dom/test-utils';
import axios from 'axios';
import renderWithRedux from '../../../__testHelpers__/renderWithRedux';
import EntryPublicationsContainer from '../EntryPublicationsContainer';
import publicationsData from '../__mocks__/entryPublicationsData.json';

const mock = new MockAdapter(axios);

mock.onGet(/\/P05067\//).reply(200, publicationsData, { 'x-total-records': 3 });

describe('EntryPublicationsContainer tests', async () => {
  test('should call to get results', async () => {
    const getSpy = jest.spyOn(axios, 'get');
    await act(async () =>
      renderWithRedux(<EntryPublicationsContainer accession="P05067" />, {
        initialState: {},
      })
    );
    expect(getSpy).toHaveBeenCalled();
  });
});
