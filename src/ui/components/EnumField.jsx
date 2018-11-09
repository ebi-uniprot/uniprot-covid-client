import React from 'react';

const EnumField = ({ field, handleInputChange }) => (
  <div className="advanced-search__inputs" key={field.term}>
    <label htmlFor={`select_${field.term}`}>
      {field.label}
      <select onChange={handleInputChange} id={`select_${field.term}`}>
        {field.values
          && field.values.map(item => (
            <option value={item.value} key={`select_${item.value}`}>
              {item.name}
            </option>
          ))}
      </select>
    </label>
  </div>
);

export default EnumField;
