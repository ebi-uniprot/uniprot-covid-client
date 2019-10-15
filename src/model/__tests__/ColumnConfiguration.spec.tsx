import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ColumnConfiguration from '../ColumnConfiguration';
import data from '../__mocks__/modelData.json';
import uniProtKbConverter from '../uniprotkb/UniProtkbConverter';

describe('ColumnConfiguration component', () => {
  let transformedData;

  beforeAll(() => {
    transformedData = uniProtKbConverter(data);
  });

  test('should render accession', () => {
    const { asFragment } = render(
      <MemoryRouter>
        {ColumnConfiguration.accession.render(transformedData)}
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render id', () => {
    const { asFragment } = render(
      ColumnConfiguration.id.render(transformedData)
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render protein_name', () => {
    const { asFragment } = render(
      ColumnConfiguration.protein_name.render(transformedData)
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render gene_names', () => {
    const { asFragment } = render(
      ColumnConfiguration.gene_names.render(transformedData)
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should render organism', () => {
    const { asFragment } = render(
      <MemoryRouter>
        {ColumnConfiguration.organism.render(transformedData)}
      </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
