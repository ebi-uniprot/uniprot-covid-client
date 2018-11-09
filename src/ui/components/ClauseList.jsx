// @flow
import React, { Component, Fragment } from 'react';
import { TreeSelect } from 'franklin-sites';
import EvidenceField from './EvidenceField';
import apiUrls from '../apiUrls';
import LogicalOperator from '../components/LogicalOperator';
import Field from '../components/Field';

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
  logic: Operator,
  queryInput: Input,
};

type Props = {
  data: Array<TermNode>,
  field: FieldType,
  updateField: Function,
};

const operators: Array<Operator> = ['AND', 'OR', 'NOT'];

const ClauseList = (clauses, handleFieldSelect, handleInputChange, handleEvidenceChange, handleRangeInputChange, handleLogicChange) => {
  return clauses.map(clause => {
    if (!clause.field) {
      return null;
    }

    // .itemType
    // single: a simple/single type item: such as accession, gene created, this is default type.
    // Comment: this item type is for comment/annotation search
    // Feature: this item type is for feature/annotation search
    // Database: this type is for cross reference search
    // goterm: for go term search
    // Group: this item type is a group type, grouping a list of search items

    return (
      <Fragment>
        <LogicalOperator
          value={clause.logic}
          handleChange={handleLogicChange}
        />
        <TreeSelect
          data={data}
          onSelect={handleFieldSelect}
        />
        <Field
          field={clause.field}
          handleInputChange={handleInputChang}
          handleRangeInputChange={handleRangeInputChange}
        />

        {clause.field.hasEvidence && (
            )}
      </Fragment>
    );
  }
    
    })

export default FieldList;
