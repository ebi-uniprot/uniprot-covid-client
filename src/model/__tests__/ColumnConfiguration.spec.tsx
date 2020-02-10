import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ColumnConfiguration from '../ColumnConfiguration';
import data from '../__mocks__/modelData.json';
import uniProtKbConverter from '../uniprotkb/UniProtkbConverter';
import renderWithRedux from '../../__testHelpers__/renderWithRedux';

describe('ColumnConfiguration component', () => {
  let transformedData;

  beforeAll(() => {
    transformedData = uniProtKbConverter(data);
    window.SVGElement.prototype.getBBox = () => ({
      width: 10,
      height: 10,
    });
  });

  test('should render all columns', () => {
    ColumnConfiguration.forEach(column => {
      const { asFragment } = renderWithRedux(
        <MemoryRouter>{column.render(transformedData)}</MemoryRouter>
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
