import React from 'react';

const TextField = ({ term, type, handleInputChange, handleRangeInputChange }) => (
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
);

export default TextField;
