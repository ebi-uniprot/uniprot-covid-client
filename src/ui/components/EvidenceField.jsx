import React from 'react';

// type Props = {
//   updateEvidence: Function,
//   selectedEvidence?: string,
//   url: string,
//   data: Array<Group>,
// };

const EvidenceField = ({ field, value='', handleChange, data=[] }) => {
  if (!data) {
    return null;
  }

  return (
    <div className="advanced-search__inputs">
      <label htmlFor="evidence_select">
        Evidence
        <select
          id="evidence_select"
          value={value}
          onChange={e => handleChange(e.target.value)}
        >
          {data.map(group => (
            <optgroup label={group.groupName} key={group.groupName}>
              {group.items.map(item => (
                <option value={item.code} key={item.code}>
                  {item.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </label>
    </div>
  );
}

export default EvidenceField;
