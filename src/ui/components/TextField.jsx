import React, { Fragment } from 'react';
import RangeField from './RangeField';

const TextField = ({ term, type, handleInputChange, handleRangeInputChange }) => (
  <Fragment>
    {(!term.hasRange || term.dataType !== 'integer') && (
      <div className="advanced-search__inputs" key={term.term}>
        <label htmlFor={`input_${term.term}`}>
          {term.label}
          <input
            id={`input_${term.term}`}
            type={type}
            onChange={handleInputChange}
            placeholder={term.example}
          />
        </label>
      </div>
    )}
    {term.hasRange
      && RangeField({
        type: 'number',
        handleRangeInputChange,
        term,
      })}
  </Fragment>
);

export default TextField;
