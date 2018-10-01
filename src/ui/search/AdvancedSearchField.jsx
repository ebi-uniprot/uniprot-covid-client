// @flow
import React, { Component, Fragment } from "react";
import cloneDeep from "lodash/cloneDeep";
import EvidenceField from "./EvidenceField";
import { TreeSelect } from "franklin-sites";

const dataTypes = { string: "text", integer: "number" };

export type Node = {
  label: string,
  term: string,
  example: string,
  itemType: string,
  dataType: string,
  hasRange?: boolean,
  hasEvidence?: boolean,
  options?: Array<{
    name: string,
    values: Array<{
      name: string,
      label: string
    }>
  }>
};

type Operator = "AND" | "OR" | "NOT";

type Props = {
  data: Array<Node>
};

type State = {
  selectedNode: Node,
  inputs: {
    stringValue?: string,
    rangeValue?: string,
    evidenceValue?: string
  },
  logic: Operator
};

class AdvancedSearchField extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    //Define default query field
    this.state = {
      selectedNode: {
        label: "Any",
        term: "",
        example: "a4_human, P05067, cdc7 human",
        itemType: "single",
        dataType: "string"
      },
      inputs: {
        stringValue: "*"
      },
      logic: "AND"
    };
  }

  _selectNode(node: Node) {
    this.setState({ selectedNode: node });
  }

  handleInputChange = (
    e: SyntheticInputEvent<HTMLInputElement>,
    queryField: string | number
  ) => {
    const inputs = this.state.inputs;
    inputs.stringValue = e.target.value;
    this.setState({ inputs });
  };

  handleEvidenceChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const inputs = this.state.inputs;
    inputs.evidenceValue = e.target.value;
    this.setState({ inputs });
  };

  handleRangeInput(e: SyntheticInputEvent<HTMLInputElement>) {
    // const selectedNode = cloneDeep(this.state.selectedNode);
    // const selectedInput = selectedNode.inputs.filter(input => input.queryField === e.target.dataset.queryfield);
    // selectedInput.value = { rangeField: e.target.value };
    // this.setState({ selectedNode });
  }

  _updateLogic(e: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({ logic: e.target.value });
  }

  renderField(input: Node) {
    return (
      <Fragment>
        {(!input.hasRange || input.dataType !== "integer") && (
          <div className="advanced-search__inputs" key={input.term}>
            <label htmlFor={`input_${input.term}`}>
              {input.label}
              <input
                id={`input_${input.term}`}
                type={dataTypes[input.dataType]}
                onChange={e => this.handleInputChange(e, input.term)}
                placeholder={input.example}
              />
            </label>
          </div>
        )}
        {input.hasRange && this.renderRangeField(input)}
      </Fragment>
    );
  }

  renderEnumField(input: Node) {
    return null;
  }

  renderRangeField(input: Node) {
    return (
      <div className="advanced-search__inputs" key={input.term}>
        <label htmlFor={`input_from_${input.term}`}>
          From
          <input
            id={`input_from_${input.term}`}
            type="number"
            onChange={e => this.handleInputChange(e, input.term)}
            placeholder="0"
          />
        </label>
        <label htmlFor={`input_to_${input.term}`}>
          To
          <input
            id={`input_to_${input.term}`}
            type="number"
            onChange={e => this.handleInputChange(e, input.term)}
            placeholder="100"
          />
        </label>
      </div>
    );
  }

  renderSelectMenu(input: Node) {
    return (
      <div className="advanced-search__inputs" key={input.term}>
        <label htmlFor={`input_${input.term}`}>
          {input.label}
          <select
            id={`input_${input.term}`}
            onChange={e => this.handleInputChange(e, input.term)}
          >
            {input.options &&
              input.options.map(optgroup => (
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

  renderRangeInputs(input: Node) {
    return (
      <div className="advanced-search__inputs" key={input.term}>
        <span>{input.label}</span>
        <label htmlFor={`input_from_${input.term}`}>
          From
          <input
            id={`input_from_${input.term}`}
            type="number"
            data-queryfield={input.term}
            onChange={e => this.handleRangeInput(e)}
          />
        </label>
        <label htmlFor={`input_to_${input.term}`}>
          To
          <input
            id={`input_to_${input.term}`}
            type="number"
            data-queryfield={input.term}
            onChange={e => this.handleRangeInput(e)}
          />
        </label>
      </div>
    );
  }

  renderDateField(input: Node) {
    //TODO render calendar picker
  }

  getQueryString(): string {
    return `${this.state.logic}(${this.state.selectedNode.term}:${
      this.state.inputs.stringValue
    })`;
  }

  render() {
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

    if (!this.state || !this.state.selectedNode) {
      return;
    }

    let field;
    switch (this.state.selectedNode.dataType) {
      case "enum":
        field = this.renderEnumField(this.state.selectedNode);
        break;
      case "date":
        field = this.renderDateField(this.state.selectedNode);
        break;
      default:
        field = this.renderField(this.state.selectedNode);
        break;
    }

    return (
      <Fragment>
        <select
          className="advanced-search__logic"
          value={this.state.logic}
          onChange={e => this._updateLogic(e)}
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
          <option value="NOT">NOT</option>
        </select>

        <TreeSelect
          data={this.props.data}
          onSelect={e => this._selectNode(e)}
        />
        {field}
        {this.state.selectedNode.hasEvidence && (
          <EvidenceField
            updateEvidence={this.handleEvidenceChange}
            selectedEvidence={this.state.inputs.evidenceValue}
          />
        )}
      </Fragment>
    );
  }
}

export default AdvancedSearchField;
