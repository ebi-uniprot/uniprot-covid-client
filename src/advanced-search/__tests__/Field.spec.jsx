import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Field from '../Field';

configure({ adapter: new Adapter() });
const handleInputChange = jest.fn();
const handleRangeInputChange = jest.fn();

describe('Clause component', () => {
  test('should render a `text` field', () => {
    const field = {
      label: 'UniProtKB AC',
      itemType: 'single',
      term: 'accession',
      dataType: 'string',
      description: 'Search by UniProtKB Accession',
      example: 'P12345',
    };
    const component = shallow(
      <Field
        field={field}
        handleInputChange={handleInputChange}
        handleRangeInputChange={handleRangeInputChange}
        queryInput={{}}
      />,
    );
    expect(component.debug()).toMatchSnapshot();
  });

  test('should render a `string` field with range', () => {
    const field = {
      label: 'UniProtKB AC',
      itemType: 'single',
      term: 'accession',
      dataType: 'string',
      hasRange: true,
      description: 'Search by UniProtKB Accession',
      example: 'P12345',
    };
    const component = shallow(
      <Field
        field={field}
        handleInputChange={handleInputChange}
        handleRangeInputChange={handleRangeInputChange}
        queryInput={{}}
      />,
    );
    expect(component.debug()).toMatchSnapshot();
  });

  test('should render an `enum` field', () => {
    const field = {
      dataType: 'enum',
    };
    const component = shallow(<Field field={field} />);
    expect(component.debug()).toMatchSnapshot();
  });

  test('should render an `integer` field', () => {
    const field = {
      label: 'Any',
      itemType: 'feature',
      term: 'sites',
      dataType: 'integer',
      description: 'Search by feature sites',
      example: 'translocation',
    };
    const component = shallow(
      <Field
        field={field}
        handleInputChange={handleInputChange}
        handleRangeInputChange={handleRangeInputChange}
        queryInput={{}}
      />,
    );
    expect(component.debug()).toMatchSnapshot();
  });

  test('should render an `integer` `range` field', () => {
    const field = {
      label: 'Any',
      itemType: 'feature',
      term: 'sites',
      dataType: 'integer',
      hasRange: true,
      description: 'Search by feature sites',
      example: 'translocation',
    };
    const component = shallow(
      <Field
        field={field}
        handleInputChange={handleInputChange}
        handleRangeInputChange={handleRangeInputChange}
        queryInput={{}}
      />,
    );
    expect(component.debug()).toMatchSnapshot();
  });

  test('should render `date` field', () => {
    const field = {
      label: 'Date Of Creation',
      itemType: 'single',
      term: 'created',
      dataType: 'date',
      hasRange: true,
      description: 'Search by Date of creation',
      example: '[2018-03-04 TO 2018-03-08]',
    };
    const component = shallow(
      <Field
        field={field}
        handleInputChange={handleInputChange}
        handleRangeInputChange={handleRangeInputChange}
        queryInput={{}}
      />,
    );
    expect(component.debug()).toMatchSnapshot();
  });

  test('should not return anything', () => {
    const field = {
      label: 'I dont exist',
      dataType: 'whatever',
    };
    const component = shallow(
      <Field
        field={field}
        handleInputChange={handleInputChange}
        handleRangeInputChange={handleRangeInputChange}
        queryInput={{}}
      />,
    );
    expect(component.debug()).toMatchSnapshot();
  });
});
