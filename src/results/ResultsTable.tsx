import React from 'react';
import { DataTable } from 'franklin-sites';
import FieldToViewMappings from './views/FieldToViewMappings';
import '../styles/alert.scss';

type ResultsTableProps = {
  results: [];
  columnNames: Array<string>;
  selectedRows: Array<{ name: string; value: string }>;
  handleRowSelect: () => void;
};

const ResultsTable: React.FC<ResultsTableProps> = ({
  results = [],
  columnNames,
  selectedRows,
  handleRowSelect,
}) => {
  const columns = columnNames.map((columnName) => {
    let render;
    if (columnName in FieldToViewMappings) {
      render = row => FieldToViewMappings[columnName](row);
    } else {
      render = () => <div className="warning">{`${columnName} has no render method`}</div>;
    }
    return {
      label: columnName,
      name: columnName,
      render,
    };
  });

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
