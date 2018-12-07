import React from 'react';
import ResultRow from './ResultRow';
import FieldToViewMappings from './views/FieldToViewMappings';

const columnNames = Object.keys(FieldToViewMappings).sort();

const ResultsTable = ({ results = [] }) => (
  <table>
    <thead>
      <tr>
        {columnNames.map(columnName => (
          <th key={`results_table_header_${columnName}`}>{columnName}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {results.map(row => (
        <ResultRow key={row.accession} {...row} />
      ))}
    </tbody>
  </table>
);
export default ResultsTable;
