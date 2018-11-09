import React from 'react';

const TextField = ({ field, type, handleInputChange, handleRangeInputChange }) => (
  <div className="advanced-search__inputs" key={field.term}>
    <label htmlFor={`input_${field.term}`}>
      {field.label}
      <input
        id={`input_${field.term}`}
        type={type}
        onChange={handleInputChange}
        placeholder={field.example}
      />
    </label>
  </div>
);

export default TextField;
