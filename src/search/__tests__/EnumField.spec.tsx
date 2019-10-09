import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EnumField from '../EnumField';

let props;
let rendered;

describe('Enum field', () => {
  beforeEach(() => {
    props = {
      field: {
        label: 'Protein Existence [PE]',
        itemType: 'single',
        term: 'existence',
        dataType: 'enum',
        values: [
          {
            name: 'Evidence at protein level',
            value: '1',
          },
          {
            name: 'Evidence at transcript level',
            value: '2',
          },
        ],
        description: 'Search by protein existence',
        example: '1',
      },
      handleChange: jest.fn(),
      queryInput: { stringValue: '1' },
    };
    rendered = render(<EnumField {...props} />);
  });

  test('should render an enum field', () => {
    const { asFragment } = rendered;
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render handle change', () => {
    const { queryAllByTestId } = rendered;
    const nodes = queryAllByTestId('enum-field-select');
    fireEvent.change(nodes[0], { target: { value: 'val1' } });
    expect(props.handleChange).toBeCalled();
  });
});
