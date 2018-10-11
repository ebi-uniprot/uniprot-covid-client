// @flow
import React, { Component } from 'react';
import axios from 'axios';
import AdvancedSearchField from './AdvancedSearchField';
import apiUrls from '../apiUrls';
import getRandomId from '../utils';

import type { TermNode, Field } from './AdvancedSearchField';

type Props = {};

type State = {
  namespace: string,
  data: Array<TermNode>,
  fields: Array<Field>,
};

class AdvancedSearch extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      namespace: 'UniProtKB',
      data: [],
      fields: this.initFields(),
    };
  }

  componentDidMount() {
    axios
      .get(apiUrls.advanced_search_terms)
      .then(d => this.setState({ data: d.data }))
      .catch(err => console.error(err));
  }

  createField = (): Field => ({
    id: getRandomId(),
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
    fields.splice(fields.findIndex(field => field.id === id), 1);
    this.setState({ fields });
  }

  submitQuery() {
    console.log(this.createQueryString());
  }

  render() {
    const { data, namespace, fields } = this.state;
    if (data.length <= 0) {
      return null;
    }
    return (
      <div className="advanced-search">
        <div>
          Searching in
          {' '}
          <select>
            <option>{namespace}</option>
          </select>
        </div>
        {fields.map(field => (
          <div key={`field_${field.id}`} className="advanced-search__field">
            <AdvancedSearchField data={data} field={field} updateField={this.updateField} />
            <button type="button" onClick={() => this.removeField(field.id)}>
              Remove
            </button>
          </div>
        ))}
        <hr />
        <div>
          <button type="button" className="button" onClick={() => this.addField()}>
            Add Field
          </button>
          <button type="button" className="button" onClick={() => this.submitQuery()}>
            Search
          </button>
        </div>
      </div>
    );
  }
}

export default AdvancedSearch;
