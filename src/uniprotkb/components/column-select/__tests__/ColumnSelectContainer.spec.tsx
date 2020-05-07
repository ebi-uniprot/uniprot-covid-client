import React from 'react';
import axios from 'axios';
import { waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import ColumnSelectContainer, {
  removeFieldFromFieldsData,
} from '../ColumnSelectContainer';
import initialState from '../../../../app/state/rootInitialState';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';
import mockResultFieldsApi from '../../../__mocks__/resultFieldsData';
import structuredResultFieldsData from '../../../__mocks__/structuredResultFieldsData.json';
import { ColumnSelectTab } from '../../../types/resultsTypes';
import { Column } from '../../../types/columnTypes';

const mock = new MockAdapter(axios);
mock
  .onGet(mockResultFieldsApi.request)
  .reply(200, mockResultFieldsApi.response);

describe('ColumnSelectContainer component', () => {
  test('should call to get field data', async () => {
    const { getAllByTestId } = renderWithRedux(
      <ColumnSelectContainer
        onChange={jest.fn()}
        selectedColumns={initialState.results.tableColumns}
      />
    );
    const items = await waitFor(() =>
      getAllByTestId('accordion-search-list-item')
    );
    const expectedNumberListItems = mockResultFieldsApi.response.reduce(
      (accum, { fields }) =>
        accum + fields.filter(field => field.name !== 'accession').length,
      0
    );
    expect(items.length).toEqual(expectedNumberListItems);
  });

  test('removeFieldFromFieldsData should remove field', () => {
    const entryField = {
      tabId: ColumnSelectTab.data,
      accordionId: 'Names & Taxonomy',
      itemId: Column.accession,
    };
    expect(
      removeFieldFromFieldsData(entryField, structuredResultFieldsData)
    ).toEqual({
      [ColumnSelectTab.data]: [
        {
          id: 'Names & Taxonomy',
          title: 'title',
          items: [
            {
              id: Column.ccAllergen,
              label: 'ccAllergen-label',
            },
          ],
        },
      ],
      [ColumnSelectTab.links]: [
        {
          id: 'Sequence',
          title: 'title',
          items: [
            {
              id: Column.drAbcd,
              label: 'drAbcd-label',
            },
          ],
        },
      ],
    });
  });
});
