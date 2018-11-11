import RangeField from './RangeField';
import EnumField from './EnumField';
import TextField from './TextField';

const dataTypes = { string: 'text', integer: 'number' };

const Field = (field, handleInputChange, handleRangeInputChange) => {
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
  if (!hasRange || dataType !== 'integer') {
    return TextField({
      field,
      handleChange: handleInputChange,
      type: dataTypes[dataType],
    });
  }
  if (hasRange) {
    return RangeField({
      field,
      handleChange: handleRangeInputChange,
      type: 'number',
    });
  }
  return null;
};

export default Field;
