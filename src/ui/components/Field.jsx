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
      return <EnumField field={field} handleChange={handleInputChange} />;
    case 'date':
      return <RangeField type="date" field={field} handleChange={handleRangeInputChange} />;
    case 'string':
      return (
        <Fragment>
          <TextField
            field={field}
            handleChange={handleInputChange}
            type="text"
            value={queryInput.stringValue}
          />
          {hasRange && dataType !== 'integer' && (
            <RangeField
              field={field}
              handleChange={handleRangeInputChange}
              type="text"
              rangeFrom={queryInput.rangeFrom}
              rangeTo={queryInput.rangeTo}
            />
          )}
        </Fragment>
      );
    case 'integer':
      if (hasRange) {
        return RangeField({
          field,
          handleChange: handleRangeInputChange,
        });
      }
      return TextField({
        field,
        type: 'number',
        handleChange: { handleInputChange },
      });
    default:
      return null;
  }
};

export default Field;
