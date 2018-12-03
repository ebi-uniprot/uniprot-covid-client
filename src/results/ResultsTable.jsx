import React from 'react';

const ResultsTable = (props) => {
  console.log(props);
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
