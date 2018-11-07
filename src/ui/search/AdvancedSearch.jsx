// @flow
import React, { Component } from 'react';
import { v1 } from 'uuid';
import AdvancedSearchField from './AdvancedSearchField';
import withData from '../hoc/withData';
import appendUniqueId from '../hoc/prepareData';
import apiUrls from '../apiUrls';

import type { Field } from './AdvancedSearchField';

type Props = {
  data: [],
};

type State = {
  namespace: string,
  fields: Array<Field>,
};

class AdvancedSearch extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      namespace: 'UniProtKB',
      fields: this.initFields(),
    };
  }

  createField = (): Field => ({
    id: v1(),
    logic: 'AND',
    selectedNode: {
      label: 'Any',
      term: 'All',
      example: 'a4_human, P05067, cdc7 human',
      itemType: 'single',
      dataType: 'string',
    },
    queryInput: {},
  });

  initFields = (): Array<Field> => [...Array(4)].map(() => this.createField());

  updateField = (field: Field) => {
    const { fields } = this.state;
    let match: void | Field = fields.find(f => f.id === field.id);
    if (match) {
      match = field;
      this.setState({ fields });
    }
  };

  createQueryString = (): string => {
    const { fields } = this.state;
    return fields.reduce((queryAccumulator: string, field: Field) => {
      let query = '';
      if (field.queryInput.rangeFrom || field.queryInput.rangeTo) {
        query = `${query}(${field.selectedNode.term}:[${
          field.queryInput.rangeFrom ? field.queryInput.rangeFrom : ''
          }-${field.queryInput.rangeTo ? field.queryInput.rangeTo : ''}])`;
      }
      if (field.queryInput.stringValue && field.queryInput.stringValue !== '') {
        query = `${query}(${field.selectedNode.term}:${
          field.queryInput.stringValue ? field.queryInput.stringValue : ''
          })`;
      }
      if (field.queryInput.evidenceValue && field.queryInput.evidenceValue !== '') {
        query = `${query}AND(${field.selectedNode.term}:${field.queryInput.evidenceValue})`;
      }
      return `${queryAccumulator}${
        queryAccumulator.length > 0 && query.length > 0 ? field.logic : ''
        }${query}`;
    }, '');
  };

  addField() {
    const { fields } = this.state;
    fields.push(this.createField());
    this.setState({ fields });
  }

  removeField(id: string) {
    const { fields } = this.state;
    const updatedFields = fields.filter(field => field.id !== id);
    this.setState({ fields: updatedFields });
  }

  submitQuery() {
    console.log(this.createQueryString());
  }

  render() {
    const { namespace, fields } = this.state;
    const { data } = this.props;
    if (!data) {
      return null;
    }
    return (
      <div className="advanced-search">
        <div>
          <label htmlFor="namespace-select">
            Searching in
            <select id="namespace-select">
              <option>{namespace}</option>
            </select>
          </label>
        </div>
        {fields.map(field => (
          <div key={`field_${field.id}`} className="advanced-search__field">
            <AdvancedSearchField data={data} field={field} updateField={this.updateField} />
            <button
              type="button"
              className="button-remove"
              onClick={() => this.removeField(field.id)}
            >
              Remove
            </button>
          </div>
        ))}
        <hr />
        <div>
          <button type="button" id="add-field" className="button" onClick={() => this.addField()}>
            Add Field
          </button>
          <button
            type="button"
            id="submit-query"
            className="button"
            onClick={() => this.submitQuery()}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
}

const url = () => apiUrls.advanced_search_terms;
export default withData(url)(AdvancedSearch);
