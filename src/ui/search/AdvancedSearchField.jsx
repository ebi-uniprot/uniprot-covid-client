// @flow
import React, { Component, Fragment } from 'react';
import { TreeSelect } from 'franklin-sites';
import EvidenceField from './EvidenceField';

const dataTypes = { string: 'text', integer: 'number' };

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
      label: string,
    }>,
  }>,
};

type Operator = 'AND' | 'OR' | 'NOT';

type Props = {
  data: Array<Node>,
};

type State = {
  selectedNode: Node,
  inputs: {
    stringValue?: string,
    rangeStart?: string,
    rangeEnd?: string,
    evidenceValue?: string,
  },
  logic: Operator,
};

const rangeFromName = 'from_';
const rangeToName = 'to_';

class AdvancedSearchField extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    // Define default query field
    this.state = {
      selectedNode: {
        label: 'Any',
        term: '',
        example: 'a4_human, P05067, cdc7 human',
        itemType: 'single',
        dataType: 'string',
      },
      inputs: {
        stringValue: '',
      },
      logic: 'AND',
    };
  }

  selectNode = (node: Node) => {
    this.setState({ selectedNode: node });
  };

  getQueryString = (): string => {
    const { logic, selectedNode, inputs } = this.state;
    let query = logic; // TODO logic should be handled in parent
    if (inputs.rangeFrom || inputs.rangeTo) {
      query = `${query}(${selectedNode.term}:[${inputs.rangeFrom}-${inputs.rangeTo}])`;
    }
    if (inputs.stringValue !== '') {
      query = `${query}(${selectedNode.term}:${inputs.stringValue})`;
    }
    if (inputs.evidenceValue) {
      query = `${query}AND(${selectedNode.term}:${inputs.evidenceValue})`;
    }
    return query;
  };

  handleInputChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { inputs } = this.state;
    inputs.stringValue = e.target.value;
    this.setState({ inputs });
  };

  handleEvidenceChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { inputs } = this.state;
    inputs.evidenceValue = e.target.value;
    this.setState({ inputs });
  };

  handleRangeInputChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const { inputs } = this.state;
    if (e.target.id.startsWith(rangeFromName)) {
      inputs.rangeFrom = e.target.value;
    } else {
      inputs.rangeTo = e.target.value;
    }
    this.setState({ inputs });
  };

  updateLogic = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ logic: e.target.value });
  };

  renderField(term: Node) {
    return (
      <Fragment>
        {(!term.hasRange || term.dataType !== 'integer') && (
          <div className="advanced-search__inputs" key={term.term}>
            <label htmlFor={`input_${term.term}`}>
              {term.label}
              <input
                id={`input_${term.term}`}
                type={dataTypes[term.dataType]}
                onChange={e => this.handleInputChange(e, term.term)}
                placeholder={term.example}
              />
            </label>
          </div>
        )}
        {term.hasRange && this.renderRangeField(term, 'number')}
      </Fragment>
    );
  }

  renderEnumField = (term: Node) => (
    <div className="advanced-search__inputs" key={term.term}>
      <label htmlFor={`select_${term.term}`}>
        {term.label}
        <select onChange={e => this.handleInputChange(e, term.term)} id={`select_${term.term}`}>
          {term.values.map(item => (
            <option value={item.value} key={`select_${item.value}`}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );

  renderRangeField(term: Node, type: string) {
    return (
      <div className="advanced-search__inputs" key={term.term}>
        <label htmlFor={`${rangeFromName}input_${term.term}`}>
          From
          <input
            id={`${rangeFromName}input_${term.term}`}
            type={type}
            onChange={e => this.handleRangeInputChange(e, term.term)}
            placeholder="0"
          />
        </label>
        <label htmlFor={`${rangeToName}input_${term.term}`}>
          To
          <input
            id={`${rangeToName}input_${term.term}`}
            type={type}
            onChange={e => this.handleRangeInputChange(e, term.term)}
            placeholder="100"
          />
        </label>
      </div>
    );
  }

  render() {
    const { selectedNode, logic, inputs } = this.state;
    const { data } = this.props;

    // .itemType
    // single: a simple/single type item: such as accession, gene created, this is default type.
    // Comment: this item type is for comment/annotation search
    // Feature: this item type is for feature/annotation search
    // Database: this type is for cross reference search
    // goterm: for go term search
    // Group: this item type is a group type, grouping a list of search items

    if (!selectedNode) {
      return null;
    }

    let field;
    switch (selectedNode.dataType) {
      case 'enum':
        field = this.renderEnumField(selectedNode);
        break;
      case 'date':
        field = this.renderRangeField(selectedNode, 'date');
        break;
      default:
        field = this.renderField(selectedNode);
        break;
    }

    return (
      <Fragment>
        <select
          className="advanced-search__logic"
          value={logic}
          onChange={e => this.updateLogic(e)}
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
          <option value="NOT">NOT</option>
        </select>

        <TreeSelect data={data} onSelect={e => this.selectNode(e)} />
        {field}
        {selectedNode.hasEvidence && (
          <EvidenceField
            updateEvidence={this.handleEvidenceChange}
            selectedEvidence={inputs.evidenceValue}
          />
        )}
      </Fragment>
    );
  }
}

export default AdvancedSearchField;
