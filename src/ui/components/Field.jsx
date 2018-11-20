import React, { Fragment } from 'react';
import RangeField from './RangeField';
import EnumField from './EnumField';
import TextField from './TextField';

const Field = ({
  field, handleInputChange, handleRangeInputChange, queryInput,
}) => {
  const { dataType, hasRange } = field;
  switch (dataType) {
    case 'enum':
      return EnumField({
        field,
        handleChange: handleInputChange,
      });
    case 'date':
      return RangeField({
        field,
        handleChange: handleRangeInputChange,
      });
    case 'string':
    case 'integer':
      return (
        <Fragment>
          <TextField
            field={field}
            handleChange={handleInputChange}
            type={dataType}
            value={queryInput.stringValue}
          />
          {hasRange && dataType !== 'integer' && (
            <RangeField
              field={field}
              handleChange={handleRangeInputChange}
              type="number"
              rangeFrom={queryInput.rangeFrom}
              rangeTo={queryInput.rangeTo}
            />
          )}
        </Fragment>
      );
    default:
      return null;
  }
};

export default Field;
