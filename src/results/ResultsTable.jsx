import React from 'react';

const ResultsTable = (props) => {
  const { results } = props;
  return (
    <div>
      {results.map(row => (
        <span key={row.accession}>{row.accession}</span>
      ))}
    </div>
  );
};
export default ResultsTable;
