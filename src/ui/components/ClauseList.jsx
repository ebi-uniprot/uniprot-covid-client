// @flow
import React from 'react';
import { TreeSelect } from 'franklin-sites';
import EvidenceField from './EvidenceField';
import LogicalOperator from './LogicalOperator';
import Field from './Field';

// .itemType
// single: a simple/single type item: such as accession, gene created, this is default type.
// Comment: this item type is for comment/annotation search
// Feature: this item type is for feature/annotation search
// Database: this type is for cross reference search
// goterm: for go term search
// Group: this item type is a group type, grouping a list of search items

export type FieldType = {
  label: string,
  term: string,
  example: string,
  itemType: string,
  dataType: string,
  hasRange?: boolean,
  hasEvidence?: boolean,
  valuePrefix?: string,
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

export type Clause = {
  id: string,
  field: FieldType,
  logicOperator: Operator,
  queryInput: Input,
};

// type Props = {
//   data: Array<FieldType>,
//   field: Clause,
//   updateField: Function,
// };

const ClauseList = ({
  clauses,
  searchTerms,
  evidences,
  handleFieldSelect,
  handleInputChange,
  handleEvidenceChange,
  handleRangeInputChange,
  handleLogicChange,
  handleRemoveClause,
}) => (
  clauses.map((clause) => {
    if (!clause.field) {
      return null;
    }

    let evidencesData;
    if (clause.field.hasEvidence) {
      const evidencesType = clause.field.term === 'go' ? 'go' : 'annotation';
      evidencesData = evidences[evidencesType].data || [];
    }

    return (
      <div key={`clause_${clause.id}`} className="advanced-search__field">
        <LogicalOperator
          value={clause.logicOperator}
          handleChange={value => handleLogicChange(clause.id, value)}
        />
        <TreeSelect
          data={searchTerms}
          onSelect={value => handleFieldSelect(clause.id, value)}
        />
        <Field
          field={clause.field}
          handleInputChange={value => handleInputChange(clause.id, value)}
          handleRangeInputChange={(value, from) => handleRangeInputChange(clause.id, value, from)}
          queryInput={clause.queryInput}
        />
        {clause.field.hasEvidence && (
          <EvidenceField
            handleChange={value => handleEvidenceChange(clause.id, value)}
            value={clause.queryInput.evidenceValue}
            data={evidencesData}
          />
        )}
        <button
          type="button"
          className="button-remove"
          onClick={() => handleRemoveClause(clause.id)}
        >
          Remove
        </button>
      </div>
    );
  })
);

export default ClauseList;
