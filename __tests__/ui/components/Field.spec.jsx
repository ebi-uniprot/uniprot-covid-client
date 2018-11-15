import React from 'react';
import { configure } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import Field from '../../../src/ui/components/Field';

configure({ adapter: new Adapter() });

// field,
// handleInputChange,
// handleRangeInputChange,
// queryInput,
const handleInputChange = x => x;
const handleRangeInputChange = x => x;

describe('Clause component', () => {
  test('should render `string` field', () => {
    const field = {
      label: 'UniProtKB AC',
      itemType: 'single',
      term: 'accession',
      dataType: 'string',
      description: 'Search by UniProtKB Accession',
      example: 'P12345',
    };
    const component = renderer.create(
      <Field
        field={field}
        handleInputChange={handleInputChange}
        handleRangeInputChange={handleRangeInputChange}
        queryInput={{}}
      />,
    ).toJSON();
    expect(component).toMatchSnapshot();
  });

  test('should render `enum` field', () => {
    const field = {
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
    };
    const component = renderer.create(
      <Field
        field={field}
        handleInputChange={handleInputChange}
        handleRangeInputChange={handleRangeInputChange}
        queryInput={{}}
      />,
    ).toJSON();
    expect(component).toMatchSnapshot();
  });

  test('should render `autocomplete` field', () => {
    const field = {
      id: 'autocomplete_field',
      field: {
        label: 'Enzyme classification [EC]',
        itemType: 'single',
        term: 'ec',
        dataType: 'string',
        autoComplete: 'https://www.ebi.ac.uk/proteins/api/selector?ec=?',
        description: 'Search by Enzyme EC number',
        example: '1.1.2.3',
      },
    };
    const component = renderer.create(
      <Field
        field={field}
        handleInputChange={handleInputChange}
        handleRangeInputChange={handleRangeInputChange}
        queryInput={{}}
      />,
    ).toJSON();
    expect(component).toMatchSnapshot();
  });

  test('should render `range` field', () => {
    const field = {
      id: 'range_field',
      field: {
        label: 'Any',
        itemType: 'feature',
        term: 'sites',
        dataType: 'string',
        hasRange: true,
        description: 'Search by feature sites',
        example: 'translocation',
      },
      queryInput: {},
    };
    const component = renderer.create(
      <Field
        field={field}
        handleInputChange={handleInputChange}
        handleRangeInputChange={handleRangeInputChange}
        queryInput={{}}
      />,
    ).toJSON();
    expect(component).toMatchSnapshot();
  });

  test('should render `evidence` field', () => {
    const field = {
      id: 'evidence_field',
      field: {
        label: 'ChEBI term',
        itemType: 'comment',
        term: 'cofactor_chebi',
        dataType: 'string',
        hasEvidence: true,
        autoComplete: 'https://www.ebi.ac.uk/proteins/api/selector?chebi=?',
        description: 'Search by cofactor chebi ',
        example: '29105',
      },
      queryInput: {},
    };
    const component = renderer.create(
      <Field
        field={field}
        handleInputChange={handleInputChange}
        handleRangeInputChange={handleRangeInputChange}
        queryInput={{}}
      />,
    ).toJSON();
    expect(component).toMatchSnapshot();
  });

  test('should render `date` field', () => {
    const field = {
      id: 'evidence_field',
      field: {
        label: 'Date Of Creation',
        itemType: 'single',
        term: 'created',
        dataType: 'date',
        hasRange: true,
        description: 'Search by Date of creation',
        example: '[2018-03-04 TO 2018-03-08]',
      },
      queryInput: {},
    };
    const component = renderer.create(
      <Field
        field={field}
        handleInputChange={handleInputChange}
        handleRangeInputChange={handleRangeInputChange}
        queryInput={{}}
      />,
    ).toJSON();
    expect(component).toMatchSnapshot();
  });
});
