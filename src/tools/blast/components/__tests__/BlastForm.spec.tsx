import React from 'react';
import { createMemoryHistory } from 'history';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fireEvent, waitFor } from '@testing-library/react';
import renderWithRedux from '../../../../shared/__test-helpers__/RenderWithRedux';
import BlastForm from '../BlastForm';
import initialState from '../../../../app/state/rootInitialState';
import { mockSuggesterApi } from '../../../../uniprotkb/components/query-builder/__tests__/__mocks__/autocompleteWrapperData';

const mock = new MockAdapter(axios);
mock.onGet().reply(200, mockSuggesterApi.response);

let component;

describe('BlastForm test', () => {
  beforeEach(() => {
    const history = createMemoryHistory();
    component = renderWithRedux(<BlastForm />, {
      initialState: {
        ...initialState,
      },
      history,
    });
  });

  it('Renders the form', () => {
    const { asFragment } = component;
    expect(asFragment()).toMatchSnapshot();
  });

  it('Sets the program and sequence type based on the sequence', () => {
    const { getByTestId } = component;
    const textArea = getByTestId('sequence-submission-input');
    fireEvent.change(textArea, { target: { value: 'ABCDEFGHIJKLMN' } });
    const stype1 = getByTestId('Sequence type-protein');
    expect(stype1.selected).toBeTruthy();
    fireEvent.change(textArea, { target: { value: 'ATCGAGCGATCAGA' } });
    const stype2 = getByTestId('Sequence type-dna');
    expect(stype2.selected).toBeTruthy();
  });

  it('Adds and removes a taxon', async () => {
    const {
      getByPlaceholderText,
      findByText,
      queryByText,
      getByTestId,
    } = component;
    const autocompleteInput = getByPlaceholderText('Homo sapiens, 9606,...');
    fireEvent.change(autocompleteInput, {
      target: { value: mockSuggesterApi.query },
    });
    const autocompleteItem = await findByText('rotavirus [1906931]');
    fireEvent.click(autocompleteItem);
    const chip = await findByText('Human rotavirus [1906931]');
    expect(chip).toBeTruthy();
    fireEvent.click(getByTestId('remove-icon'));
    await waitFor(() =>
      expect(queryByText('Human rotavirus [1906931]')).toBeFalsy()
    );
  });
});
