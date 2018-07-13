import React, { Component, Fragment } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { TreeSelect } from 'franklin-sites';

const dataTypes = { string: 'text', integer: 'number' };

class AdvancedSearchField extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      selectedNode: this.props.selectedNode,
    };
  }

  _selectNode(node) {
    this.setState({ selectedNode: node });
  }

  handleInputChange(e, queryField) {}

  handleRangeInput(e, rangeField) {
    const selectedNode = cloneDeep(this.state.selectedNode);
    for (const input of selectedNode.inputs) {
      if (input.queryField === e.target.dataset.queryfield) {
        input.value = { rangeField: e.target.value };
        this.setState({ selectedNode });
        return;
      }
    }
  }

  renderField(input) {
    return (
      <div className="advanced-search__inputs" key={input.queryField}>
        <label>
          {input.label}
          <input
            type={dataTypes[input.dataType]}
            onChange={e => this.handleInputChange(e, input.queryField)}
            placeholder={input.example}
          />
        </label>
      </div>
    );
  }

  renderEnumField(input) {
    return null;
  }

  renderRangeField(input) {
    return (
      <div className="advanced-search__inputs" key={input.queryField}>
        <label>
          From
          <input
            type="number"
            onChange={e => this.handleInputChange(e, input.queryField)}
            placeholder="0"
          />
        </label>
        <label>
          To
          <input
            type="number"
            onChange={e => this.handleInputChange(e, input.queryField)}
            placeholder="100"
          />
        </label>
      </div>
    );
  }

  renderSelectMenu(input) {
    return (
      <div className="advanced-search__inputs" key={input.queryField}>
        <label>
          {input.label}
          <select onChange={e => this.handleInputChange(e, input.queryField)}>
            {input.options.map(optgroup => (
              <optgroup label={optgroup.name}>
                {optgroup.values.map(option => (
                  <option value={option.name} key={option.name}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
      </div>
    );
  }

  renderRangeInputs(input) {
    return (
      <div className="advanced-search__inputs" key={input.queryField}>
        <span>{input.label}</span>
        <label>
          From<input
            type="number"
            data-queryfield={input.queryField}
            onChange={this.handleRangeInput('from')}
          />
        </label>
        <label>
          To<input
            type="number"
            data-queryfield={input.queryField}
            onChange={this.handleRangeInput('to')}
          />
        </label>
      </div>
    );
  }

  render() {
    // this.state.hasRange
    // this.state.hasEvidence
    // this.state.autoComplete

    // .itemType
    // single: a simple/single type item: such as accession, gene created, this is default type.
    // Comment: this item type is for comment/annotation search
    // Feature: this item type is for feature/annotation search
    // Database: this type is for cross reference search
    // goterm: for go term search
    // Group: this item type is a group type, grouping a list of search items

    // .dataType
    // string
    // integer
    // enum (has 'values')
    // date
    // range

    let field;
    switch (this.state.selectedNode.dataType) {
      case 'enum':
        field = this.renderEnumField(this.state.selectedNode);
        break;
      case 'date':
        field = this.renderDateField(this.state.selectedNode);
        break;
      case 'range':
        field = this.renderRangeField(this.state.selectedNode);
        break;
      default:
        field = this.renderField(this.state.selectedNode);
        break;
    }

    // input.value = input.value ? input.value : '';
    // if (input.type === 'select') {
    //   return this.renderSelectMenu(input);
    // } else if (input.type === 'textrange') {
    //   return this.renderRangeInputs(input);
    // } else if (input.type === 'date range') {
    //   // TODO
    // } else {

    // }

    return (
      <Fragment>
        <TreeSelect data={this.props.data} onSelect={e => this._selectNode(e)} />
        {field}
      </Fragment>
    );
  }
}

export default AdvancedSearchField;
