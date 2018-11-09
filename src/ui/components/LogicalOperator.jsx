// @flow
import React from 'react';

const operators: Array<Operator> = ['AND', 'OR', 'NOT'];

const LogicalOperator = ({ value, handleChange }) => (
  <select
    className="advanced-search__logic"
    value={value}
    onChange={handleChange}
  >
    {operators.map(op => (
      <option value={op} key={op}>
        {op}
      </option>
    ))}
  </select>
)

export default LogicalOperator;