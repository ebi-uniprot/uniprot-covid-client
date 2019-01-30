import React from 'react';
import { DataTable } from 'franklin-sites';
import FieldToViewMappings from './views/FieldToViewMappings';
import '../styles/alert.scss';
import sortableColumns from './sortableColumns';

type ResultsTableProps = {
  results: [];
  columnNames: Array<string>;
  selectedRows: Array<{ name: string; value: string }>;
  handleRowSelect: (rowId: string) => void;
  handleHeaderClick: (column: string) => void;
  sort: { column: string; direction: string };
};

const ResultsTable: React.FC<ResultsTableProps> = ({
  results = [],
  columnNames,
  selectedRows,
  handleRowSelect,
  handleHeaderClick,
  sort,
}) => {
  const columns = columnNames.map((columnName) => {
    let render;
    if (columnName in FieldToViewMappings) {
      render = (row: any) => FieldToViewMappings[columnName](row);
    } else {
      render = () => <div className="warning">{`${columnName} has no render method`}</div>;
    }
    return {
      label: columnName,
      name: columnName,
      render,
      sortable: columnName in sortableColumns,
      sorted: columnName === sort.column ? sort.direction : false,
    };
  });
  return (
    <DataTable
      columns={columns}
      data={results}
      selectable
      selected={selectedRows}
      onSelect={handleRowSelect}
      onHeaderClick={handleHeaderClick}
    />
  );
};
export default ResultsTable;
