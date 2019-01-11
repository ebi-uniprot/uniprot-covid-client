import React from 'react';
import { TreeSelect } from 'franklin-sites';
import EvidenceField from './EvidenceField';
import LogicalOperator from './LogicalOperator';
import Field from './Field';
import {
  Clause, FieldType, Operator, EvidenceType,
} from './types/searchTypes';

// .itemType
// single: a simple/single type item: such as accession, gene created, this is default type.
// Comment: this item type is for comment/annotation search
// Feature: this item type is for feature/annotation search
// Database: this type is for cross reference search
// goterm: for go term search
// Group: this item type is a group type, grouping a list of search items

// type Props = {
//   data: Array<FieldType>,
//   field: Clause,
//   updateField: Function,
// };

type ClauseListProps = {
  clauses: Array<Clause>;
  searchTerms: Array<FieldType>;
  evidences: Array<any>;
  handleFieldSelect: (clauseId: string, field: FieldType) => void;
  handleInputChange: (clauseId: string, value: string | number) => void;
  handleEvidenceChange: (clauseId: string, value: string | number) => void;
  handleRangeInputChange: (clauseId: string, value: number, from?: boolean) => void;
  handleLogicChange: (clauseId: string, value: string | number) => void;
  handleRemoveClause: (clauseId: string) => void;
};

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
}: ClauseListProps) => clauses.map((clause) => {
  if (!clause.field) {
    return null;
  }

  let evidencesData;
  if (clause.field.hasEvidence) {
    const evidencesType = clause.field.term === EvidenceType.GO ? EvidenceType.GO : EvidenceType.ANNOTATION;
    evidencesData = evidences[evidencesType].data || [];
  }

  return (
    <div key={`clause_${clause.id}`} className="advanced-search__clause">
      <LogicalOperator
        value={clause.logicOperator}
        handleChange={(value: Operator) => handleLogicChange(clause.id, value)}
      />
      <TreeSelect
        data={searchTerms}
        onSelect={(value: FieldType) => handleFieldSelect(clause.id, value)}
        autocompletePlaceholder="Search for field"
        value={clause.field}
        autocomplete
      />
      <Field
        field={clause.field}
        handleInputChange={(value: string) => handleInputChange(clause.id, value)}
        handleRangeInputChange={(value: number, from?: boolean) => handleRangeInputChange(clause.id, value, from)
          }
        queryInput={clause.queryInput}
      />
      {clause.field.hasEvidence && (
      <EvidenceField
        handleChange={(value: string | number) => handleEvidenceChange(clause.id, value)}
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
});

export default ClauseList;
