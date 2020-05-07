import React, { FC } from 'react';
import {
  DownloadIcon,
  BasketIcon,
  StatisticsIcon,
  TableIcon,
  ListIcon,
  EditIcon,
} from 'franklin-sites';
import { Link } from 'react-router-dom';
import { ViewMode } from './state/resultsInitialState';

const ResultsButtons: FC<{
  viewMode: ViewMode;
  setViewMode: (viewMode: ViewMode) => void;
}> = ({ viewMode, setViewMode }) => {
  return (
    <div className="button-group">
      <button type="button" className="button tertiary disabled">
        Blast
      </button>
      <button type="button" className="button tertiary disabled">
        Align
      </button>
      <button type="button" className="button tertiary">
        {/* <Link
          to={{
            pathname: '/download',
            state: {
              query,
              selectedFacets,
              sortColumn,
              sortDirection,
              selectedEntries,
              totalNumberResults: total,
            },
          }}
        >
          <DownloadIcon />
          Download
        </Link> */}
      </button>
      <button type="button" className="button tertiary disabled">
        <BasketIcon />
        Add
      </button>
      <button type="button" className="button tertiary">
        <StatisticsIcon />
        Statistics
      </button>
      <button
        type="button"
        className="button tertiary large-icon"
        onClick={() =>
          setViewMode(
            viewMode === ViewMode.CARD ? ViewMode.TABLE : ViewMode.CARD
          )
        }
        data-testid="table-card-toggle"
      >
        <span
          className={viewMode === ViewMode.CARD ? 'tertiary-icon__active' : ''}
        >
          <TableIcon />
        </span>
        <span
          className={viewMode === ViewMode.TABLE ? 'tertiary-icon__active' : ''}
        >
          <ListIcon />
        </span>
      </button>
      {viewMode === ViewMode.TABLE && (
        <Link to="/customise-table">
          <button type="button" className="button tertiary">
            <EditIcon />
            Customize data
          </button>
        </Link>
      )}
    </div>
  );
};

export default ResultsButtons;
