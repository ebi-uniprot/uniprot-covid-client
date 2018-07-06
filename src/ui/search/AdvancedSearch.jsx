import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import data from './advanced-search-data.json';
import AdvancedSearchField from './AdvancedSearchField';
import '../../styles/advanced-search-fields.scss';

class AdvancedSearch extends Component {
  static getRandomId() {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '');
  }

  constructor(props) {
    super(props);
    this.state = {
      namespace: 'UniProtKB',
      fields: this.initFields(),
    };
  }

  initFields() {
    const fields = [];
    for (let i = 0; i < 4; i++) {
      fields.push(this.createField());
    }
    return fields;
  }

  createField() {
    return {
      id: AdvancedSearch.getRandomId(),
      selectedNode: cloneDeep(data[0]),
      logic: 'AND',
    };
  }

  _updateSelectedNode(node, id) {
    const fields = cloneDeep(this.state.fields);
    fields.map((field) => {
      if (field.id === id) {
        field.selectedNode = node;
      }
    });
    this.setState({ fields });
  }

  _updateLogic(e, id) {
    const fields = cloneDeep(this.state.fields);
    fields.map((field) => {
      if (field.id === id) {
        field.logic = e.target.value;
      }
    });
    this.setState({ fields });
  }

  _addField() {
    const fields = cloneDeep(this.state.fields);
    fields.push(this._createField());
    this.setState({ fields });
  }

  _removeField(id) {
    const fields = cloneDeep(this.state.fields);
    fields.splice(fields.findIndex(field => field.id === id), 1);
    this.setState({ fields });
  }

  _getQueryField() {
    let queryString = '';
    // TODO handle proper query string creation
    console.log(this.state.selectedNode.queryField);
    for (const input of this.state.selectedNode.inputs) {
      queryString = `${queryString} ${input.queryField}:"${input.value}"`.trim();
    }
    return queryString;
  }

  _submitQuery() {
    console.log(this.state.fields);
  }

  render() {
    return (
      <div>
        <div>
          Searching in{' '}
          <select>
            <option>{this.state.namespace}</option>
          </select>
        </div>
        {this.state.fields.map(field => (
          <div key={field.id}>
            <select value={field.logic} onChange={e => this._updateLogic(e, field.id)}>
              <option value="AND">AND</option>
              <option value="OR">OR</option>
              <option value="NOT">NOT</option>
            </select>
            <AdvancedSearchField
              data={data}
              selectedNode={field.selectedNode}
              onNodeSelect={node => this._updateSelectedNode(node, field.id)}
            />
            <a onClick={() => this._removeField(field.id)}>Remove</a>
          </div>
        ))}
        <hr />
        <div>
          <a className="button right-float" onClick={() => this._addField()}>
            Add Field
          </a>
          <a className="button right-float" onClick={() => this._submitQuery()}>
            Search
          </a>
        </div>
      </div>
    );
  }
}

export default AdvancedSearch;
