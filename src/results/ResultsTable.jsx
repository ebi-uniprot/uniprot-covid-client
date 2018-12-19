import React from 'react';
import { DataTable } from 'franklin-sites';
import ResultRow from './ResultRow';
import FieldToViewMappings from './views/FieldToViewMappings';
import Field from '../search/Field';

const ResultsTable = ({ results = [], selectedRows, handleRowSelect }) => {
  const columnNames = ['accession', 'id', 'protein_name', 'gene_name'];
  const columns = columnNames.map(columnName => ({
    label: columnName,
    name: columnName,
    render: row => FieldToViewMappings[columnName](row),
  }));
  return (
    <DataTable
      columns={columns}
      data={results}
      selectable
      selected={selectedRows}
      onSelect={handleRowSelect}
    />
  );
};
export default ResultsTable;
