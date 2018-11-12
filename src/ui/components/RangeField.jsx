import React from 'react';

const rangeFromName = 'from_';
const rangeToName = 'to_';

const RangeField = ({ field, type, handleChange }) => (
  <div className="advanced-search__inputs" key={`range_${field.term}`}>
    <label htmlFor={`${rangeFromName}input_${field.term}`}>
      From
      <input
        id={`${rangeFromName}input_${field.term}`}
        type={type}
        onChange={e => handleChange(e.target.value, true)}
        placeholder="0"
      />
    </label>
    <label htmlFor={`${rangeToName}input_${field.term}`}>
      To
      <input
        id={`${rangeToName}input_${field.term}`}
        type={type}
        onChange={e => handleChange(e.target.value, false)}
        placeholder="100"
      />
    </label>
  </div>
);

export default RangeField;
