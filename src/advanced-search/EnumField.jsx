import React, { Fragment } from 'react';

const EnumField = ({ field, handleChange }) => (
  <Fragment>
    <label htmlFor={`select_${field.term}`}>
      {field.label}
      <select onChange={e => handleChange(e.target.value)} id={`select_${field.term}`}>
        {field.values
          && field.values.map(item => (
            <option value={item.value} key={`select_${item.value}`}>
              {item.name}
            </option>
          ))}
      </select>
    </label>
  </Fragment>
);

export default EnumField;