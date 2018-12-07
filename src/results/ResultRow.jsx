import React from 'react';
import FieldToViewMappings from './views/FieldToViewMappings';

const columnNames = Object.keys(FieldToViewMappings).sort();

const ResultRow = props => (
  <tr>
    {columnNames.map(c => (
      <td key={`${props.accession}_${c}`}>{FieldToViewMappings[c](props)}</td>
    ))}
  </tr>
);
export default ResultRow;
