import RangeField from './RangeField';
import EnumField from './EnumField';
import TextField from './TextField';

const Field = ({
  field, handleInputChange, handleRangeInputChange, queryInput,
}) => {
  const { dataType, hasRange } = field;
  if (dataType === 'enum') {
    return EnumField({
      field,
      handleChange: handleInputChange,
    });
  }
  if (dataType === 'date') {
    return RangeField({
      field,
      handleChange: handleRangeInputChange,
    });
  }
  if (dataType === 'string' || dataType === 'integer') {
    return TextField({
      field,
      handleChange: handleInputChange,
      type: dataType,
      value: queryInput.stringValue,
    });
  }
  if (hasRange && dataType !== 'integer') {
    return RangeField({
      field,
      handleChange: handleRangeInputChange,
      type: 'number',
      rangeFrom: queryInput.rangeFrom,
      rangeTo: queryInput.rangeTo,
    });
  }
  return null;
};

export default Field;
