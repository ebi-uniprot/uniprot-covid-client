// @flow
import React, { Component } from 'react';
import AdvancedSearchField from './AdvancedSearchField';
import apiUrls from '../apiUrls';
import axios from 'axios';

import type Node from './AdvancedSearch';

type Props = {};

type State = {
  namespace: string,
  data: Array<Node>,
  fields: Array<Field>,
};

type Field = {
  id: string,
  ref: React.Ref<AdvancedSearchField>,
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
    console.log(apiUrls.advanced_search_terms);
    axios
      .get(apiUrls.advanced_search_terms)
      .then(d => this.setState({ data: d.data }))
      .catch(err => console.log(err));
  }

  _getRandomId(): string {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '');
  }

  initFields() {
    const fields = [];
    for (let i = 0; i < 4; i++) {
      fields.push(this.createField());
    }
    return fields;
  }

  createField(): Field {
    return {
      id: this._getRandomId(),
      ref: React.createRef(),
    };
  }

  _addField() {
    const fields = this.state.fields;
    fields.push(this.createField());
    this.setState({ fields });
  }

  _removeField(id: string) {
    const fields = this.state.fields;
    fields.splice(fields.findIndex(field => field.id === id), 1);
    this.setState({ fields });
  }

  _submitQuery() {
    let query = '';
    this.state.fields.map((field, index) => {
      if (index > 0) {
        query = `${query}${field.ref.current.state.logic}`;
      }
      query = `${query}(${field.ref.current.state.selectedNode.term}:${
        field.ref.current.state.inputValues
      })`;
    });
    console.log(query);
  }

  render() {
    if (this.state.data.length <= 0) {
      return null;
    }
    return (
      <div className="advanced-search">
        <div>
          Searching in{' '}
          <select>
            <option>{this.state.namespace}</option>
          </select>
        </div>
        {this.state.fields.map((field, i) => (
          <div key={`field_${field.id}`} className="advanced-search__field">
            <AdvancedSearchField data={this.state.data} ref={field.ref} />
            <a onClick={() => this._removeField(field.id)}>Remove</a>
          </div>
        ))}
        <hr />
        <div>
          <a className="button" onClick={() => this._addField()}>
            Add Field
          </a>
          <a className="button" onClick={() => this._submitQuery()}>
            Search
          </a>
        </div>
      </div>
    );
  }
}

export default AdvancedSearch;
