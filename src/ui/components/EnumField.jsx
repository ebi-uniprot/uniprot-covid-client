import React from 'react';

const EnumField = ({ term, handleInputChange }) => (
  <div className="advanced-search__inputs" key={term.term}>
    <label htmlFor={`select_${term.term}`}>
      {term.label}
      <select onChange={handleInputChange} id={`select_${term.term}`}>
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

export default EnumField;
