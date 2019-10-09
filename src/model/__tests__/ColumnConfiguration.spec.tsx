import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ColumnConfiguration from '../ColumnConfiguration';
import data from '../__mocks__/modelData.json';

describe('ColumnConfiguration component', () => {
  test('should render accession', () => {
    const { asFragment } = render(
      <MemoryRouter>{ColumnConfiguration.accession.render(data)}</MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render id', () => {
    const { asFragment } = render(ColumnConfiguration.id.render(data));
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render protein_name', () => {
    const { asFragment } = render(
      ColumnConfiguration.protein_name.render(data)
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render gene_names', () => {
    const { asFragment } = render(ColumnConfiguration.gene_names.render(data));
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render organism', () => {
    const { asFragment } = render(ColumnConfiguration.organism.render(data));
    expect(asFragment()).toMatchSnapshot();
  });
});
