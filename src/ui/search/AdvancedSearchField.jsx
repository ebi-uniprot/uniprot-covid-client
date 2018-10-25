// @flow
import React, { Component, Fragment } from 'react';
import { TreeSelect } from 'franklin-sites';
import EvidenceField from './EvidenceField';
import apiUrls from '../apiUrls';

const dataTypes = { string: 'text', integer: 'number' };

export type TermNode = {
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
      label: string,
    }>,
  }>,
  values?: Array<{
    name: string,
    value: string,
  }>,
};

export type Input = {
  stringValue?: string,
  rangeFrom?: string,
  rangeTo?: string,
  evidenceValue?: string,
};

export type Operator = 'AND' | 'OR' | 'NOT';

export type Field = {
  id: string,
  selectedNode: TermNode,
  logic: Operator,
  queryInput: Input,
};

type Props = {
  data: Array<TermNode>,
  field: Field,
  updateField: Function,
};

const operators: Array<Operator> = ['AND', 'OR', 'NOT'];
const rangeFromName = 'from_';
const rangeToName = 'to_';

class AdvancedSearchField extends Component<Props> {
  selectNode = (node: TermNode) => {
    const { field, updateField } = this.props;
    field.selectedNode = node;
    updateField(field);
  };

  handleInputChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { field, updateField } = this.props;
    field.queryInput.stringValue = e.target.value;
    updateField(field);
  };

  handleEvidenceChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { field, updateField } = this.props;
    field.queryInput.evidenceValue = e.target.value;
    updateField(field);
  };

  handleRangeInputChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { field, updateField } = this.props;
    if (e.target.id.startsWith(rangeFromName)) {
      field.queryInput.rangeFrom = e.target.value;
    } else {
      field.queryInput.rangeTo = e.target.value;
    }
    updateField(field);
  };

  updateLogic = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { field, updateField } = this.props;
    const op = operators.find(o => o === e.target.value);
    if (!op) {
      return;
    }
    field.logic = op;
    updateField(field);
  };

  renderField(term: TermNode) {
    return (
      <Fragment>
        {(!term.hasRange || term.dataType !== 'integer') && (
          <div className="advanced-search__inputs" key={term.term}>
            <label htmlFor={`input_${term.term}`}>
              {term.label}
              <input
                id={`input_${term.term}`}
                type={dataTypes[term.dataType]}
                onChange={e => this.handleInputChange(e)}
                placeholder={term.example}
              />
            </label>
          </div>
        )}
        {term.hasRange && this.renderRangeField(term, 'number')}
      </Fragment>
    );
  }

  renderEnumField = (term: TermNode) => (
    <div className="advanced-search__inputs" key={term.term}>
      <label htmlFor={`select_${term.term}`}>
        {term.label}
        <select onChange={e => this.handleInputChange(e)} id={`select_${term.term}`}>
          {term.values
            && term.values.map(item => (
              <option value={item.value} key={`select_${item.value}`}>
                {item.name}
              </option>
            ))}
        </select>
      </label>
    </div>
  );

  renderRangeField(term: TermNode, type: string) {
    return (
      <div className="advanced-search__inputs" key={`range_${term.term}`}>
        <label htmlFor={`${rangeFromName}input_${term.term}`}>
          From
          <input
            id={`${rangeFromName}input_${term.term}`}
            type={type}
            onChange={e => this.handleRangeInputChange(e)}
            placeholder="0"
          />
        </label>
        <label htmlFor={`${rangeToName}input_${term.term}`}>
          To
          <input
            id={`${rangeToName}input_${term.term}`}
            type={type}
            onChange={e => this.handleRangeInputChange(e)}
            placeholder="100"
          />
        </label>
      </div>
    );
  }

  render() {
    const { field, data } = this.props;

    // .itemType
    // single: a simple/single type item: such as accession, gene created, this is default type.
    // Comment: this item type is for comment/annotation search
    // Feature: this item type is for feature/annotation search
    // Database: this type is for cross reference search
    // goterm: for go term search
    // Group: this item type is a group type, grouping a list of search items

    if (!field.selectedNode) {
      return null;
    }

    let fieldRender;
    switch (field.selectedNode.dataType) {
      case 'enum':
        fieldRender = this.renderEnumField(field.selectedNode);
        break;
      case 'date':
        fieldRender = this.renderRangeField(field.selectedNode, 'date');
        break;
      default:
        fieldRender = this.renderField(field.selectedNode);
        break;
    }

    return (
      <Fragment>
        <select
          className="advanced-search__logic"
          value={field.logic}
          onChange={e => this.updateLogic(e)}
        >
          {operators.map(op => (
            <option value={op} key={op}>
              {op}
            </option>
          ))}
        </select>

        <TreeSelect data={data} onSelect={e => this.selectNode(e)} />
        {fieldRender}
        {field.selectedNode
          && field.selectedNode.hasEvidence && (
            <EvidenceField
              updateEvidence={this.handleEvidenceChange}
              selectedEvidence={field.queryInput.evidenceValue}
              url={
                field.selectedNode.term === 'go'
                  ? apiUrls.go_evidences
                  : apiUrls.annotation_evidences
              }
            />
        )}
      </Fragment>
    );
  }
}

export default AdvancedSearchField;
