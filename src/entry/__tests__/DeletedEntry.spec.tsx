import React from 'react';
import { Route } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { fireEvent, waitForElement } from '@testing-library/dom';
import Entry from '../Entry';
import renderWithRedux from '../../__testHelpers__/renderWithRedux';
import entryData from '../../__mocks__/deletedEntryModelData';
import entryInitialState from '../state/entryInitialState';
import apiUrls from '../../utils/apiUrls';

const { primaryAccession } = entryData;
const mock = new MockAdapter(axios);

mock.onGet(apiUrls.entry(primaryAccession)).reply(200, entryData);

let component;

describe('Deleted Entry', () => {
  beforeEach(() => {
    component = renderWithRedux(
      <Route
        component={props => <Entry {...props} />}
        path="/uniprotkb/:accession"
      />,
      {
        route: `/uniprotkb/${primaryAccession}`,
        initialState: {
          entry: {
            ...entryInitialState,
          },
        },
      }
    );
  });

  it('should render main', async () => {
    await act(async () => {
      const { asFragment } = component;
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
