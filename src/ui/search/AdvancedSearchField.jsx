import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import { TreeSelect } from 'franklin-sites';

class AdvancedSearchField extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      selectedNode: this.props.selectedNode,
      treeSelectOpen: false,
    };
  }

  _selectNode(node) {
    this.setState({ selectedNode: node });
    this.toggleTreeSelect();
    this.props.onNodeSelect(node);
  }

  toggleTreeSelect() {
    this.setState({ treeSelectOpen: !this.state.treeSelectOpen });
  }

  handleInputChange(e, queryField) {
    const selectedNode = cloneDeep(this.state.selectedNode);
    for (const input of selectedNode.inputs) {
      if (input.queryField === queryField) {
        input.value = e.target.value;
        this.setState({ selectedNode });
        this.props.onNodeSelect(selectedNode);
        return;
      }
    }
  }

  handleRangeInput(e, rangeField) {
    const selectedNode = cloneDeep(this.state.selectedNode);
    for (const input of selectedNode.inputs) {
      if (input.queryField === e.target.dataset.queryfield) {
        input.value = { rangeField: e.target.value };
        this.setState({ selectedNode });
        this.props.onNodeSelect(selectedNode);
        return;
      }
    }
  }

  renderSelectMenu(input) {
    return (
      <div className="advanced-search-inputs" key={input.queryField}>
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
      <div className="advanced-search-inputs" key={input.queryField}>
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
    const treeSelectClass = this.state.treeSelectOpen
      ? 'tree-select-menu tree-select-open'
      : 'tree-select-menu';
    return (
      <div className="advanced-search-field">
        <TreeSelect data={this.props.data} onSelect={e => this._selectNode(e)} />
        {this.state.selectedNode.inputs.map((input) => {
          // initialise value for controlled input
          input.value = input.value ? input.value : '';
          if (input.type === 'select') {
            return this.renderSelectMenu(input);
          } else if (input.type === 'textrange') {
            return this.renderRangeInputs(input);
          } else if (input.type === 'date range') {
            // TODO
          } else {
            return (
              <div className="advanced-search-inputs" key={input.queryField}>
                <label>
                  {input.label}
                  <input
                    type={input.type}
                    onChange={e => this.handleInputChange(e, input.queryField)}
                    value={input.value}
                  />
                </label>
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default AdvancedSearchField;
