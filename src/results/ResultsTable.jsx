import React from 'react';

const ResultsTable = ({ results = [] }) => {
  console.log(results);
  return (
    <div>
      {results.map(row => (
        <span key={row.accession}>{row.accession}</span>
      ))}
    </div>
  );
};
export default ResultsTable;
