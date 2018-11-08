import React from 'react';

const rangeFromName = 'from_';
const rangeToName = 'to_';

const RangeField = ({ term, type, handleRangeInputChange }) => (
  <div className="advanced-search__inputs" key={`range_${term.term}`}>
    <label htmlFor={`${rangeFromName}input_${term.term}`}>
      From
      <input
        id={`${rangeFromName}input_${term.term}`}
        type={type}
        onChange={handleRangeInputChange}
        placeholder="0"
      />
    </label>
    <label htmlFor={`${rangeToName}input_${term.term}`}>
      To
      <input
        id={`${rangeToName}input_${term.term}`}
        type={type}
        onChange={handleRangeInputChange}
        placeholder="100"
      />
    </label>
  </div>
);

export default RangeField;
