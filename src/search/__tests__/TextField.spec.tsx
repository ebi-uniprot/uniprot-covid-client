import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TextField from '../TextField';

describe('Range field', () => {
  const props = {
    field: {
      label: 'UniProtKB AC',
      itemType: 'single',
      term: 'accession',
      description: 'Search by UniProtKB Accession',
      example: 'P12345',
    },
    type: 'string',
    queryInput: {},
    handleChange: jest.fn(),
  };

  test('should render a text field', () => {
    const { asFragment, getByPlaceholderText } = render(
      <TextField {...props} />
    );
    const inputElt = getByPlaceholderText('P12345');
    expect(inputElt.value).toBe('');
    fireEvent.change(inputElt, { target: { value: 'Some term' } });
    expect(inputElt.value).toBe('Some term');
    expect(asFragment()).toMatchSnapshot();
  });
});
