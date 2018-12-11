import React, { Fragment } from 'react';
import RangeField from './RangeField';
import EnumField from './EnumField';
import TextField from './TextField';
import AutocompleteWrapper from '../autocomplete/AutocompleteWrapper';

const Field = ({
  field, handleInputChange, handleRangeInputChange, queryInput,
}) => {
  const { dataType, hasRange } = field;
  let node;
  switch (dataType) {
    case 'enum':
      node = (
        <EnumField field={field} handleChange={handleInputChange} value={queryInput.stringValue} />
      );
      break;
    case 'date':
      node = <RangeField type="date" field={field} handleChange={handleRangeInputChange} />;
      break;
    case 'string':
      node = (
        <Fragment>
          {field.autoComplete ? (
            <AutocompleteWrapper
              url={field.autoComplete}
              onSelect={handleInputChange}
              title={field.label}
              value={queryInput.stringValue}
            />
          ) : (
            <TextField
              field={field}
              handleChange={handleInputChange}
              type="text"
              value={queryInput.stringValue}
            />
          )}
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
      break;
    case 'integer':
      if (hasRange) {
        node = RangeField({
          field,
          handleChange: handleRangeInputChange,
        });
      }
      node = TextField({
        field,
        type: 'number',
        handleChange: { handleInputChange },
      });
      break;
    default:
      return null;
  }
  return <div className="advanced-search__inputs">{node}</div>;
};

export default Field;
