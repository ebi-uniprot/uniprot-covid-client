import React, { FC, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';
import {
  Loader,
  PageIntro,
  DownloadIcon,
  BasketIcon,
  StatisticsIcon,
  TableIcon,
  ListIcon,
  EditIcon,
} from 'franklin-sites';
import { Clause, Namespace } from '../search/types/searchTypes';
import SideBarLayout from '../layout/SideBarLayout';
import ResultsView from './ResultsView';
import infoMappings from '../info/InfoMappings';
import { RootState } from '../state/state-types';
import { ViewMode } from './state/resultsInitialState';
import { Column } from '../model/types/ColumnTypes';
import { getAPIQueryUrl } from '../utils/apiUrls';
import { getParamsFromURL } from './utils';
import ResultsFacets from './ResultsFacets';
import useDataApi from '../hooks/useDataApi';

type ResultsProps = {
  namespace: Namespace;
  tableColumns: Column[];
  clauses?: Clause[];
} & RouteComponentProps;

const Results: FC<ResultsProps> = ({ namespace, location, tableColumns }) => {
  const { search: queryParamFromUrl } = location;
  const { query, selectedFacets, sortColumn, sortDirection } = getParamsFromURL(
    queryParamFromUrl
  );

  const [selectedEntries, setSelectedEntries] = useState({});
  const [viewMode, setViewMode] = useState(ViewMode.CARD);

  /**
   * WARNING: horrible hack to get the switch between
   * table and cards to work while we wait for the backend
   * to generate a column for card counts and we refactor
   * this class as a functional component and put all url
   * parameters in the store.
   */
  const columns: Column[] = viewMode === ViewMode.TABLE ? tableColumns : [];

  const initialApiUrl = getAPIQueryUrl(
    query,
    columns,
    selectedFacets,
    sortColumn,
    sortDirection
  );

  const { data, error, loading, headers } = useDataApi(initialApiUrl);

  if (error) {
    // TODO handle error with ErrorPage
  }

  if (loading) {
    return <Loader />;
  }

  const { facets } = data;
  const total = headers['x-totalrecords'];

  const handleEntrySelection = (rowId: string): void => {
    // TODO this is broken
    if (rowId in selectedEntries) {
      const { [rowId]: value, ...newSelectedEntries } = selectedEntries;
      setSelectedEntries(newSelectedEntries);
    } else {
      selectedEntries[rowId] = true;
      setSelectedEntries(selectedEntries);
    }
  };

  const { name, links, info } = infoMappings[namespace];

  const actionButtons = (
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
              selectedEntries: Object.keys(selectedEntries),
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
        // TODO this needs to be persisted in LocalStorage
        <Link to="/customise-table">
          <button type="button" className="button tertiary">
            <EditIcon />
            Customize data
          </button>
        </Link>
      )}
    </div>
  );

  return (
    <Fragment>
      <SideBarLayout
        title={
          <Fragment>
            <PageIntro title={name} links={links} resultsCount={total}>
              {info}
            </PageIntro>
          </Fragment>
        }
        actionButtons={actionButtons}
        sidebar={<ResultsFacets facets={facets} />}
      >
        <Fragment>
          <ResultsView
            columns={columns}
            handleEntrySelection={handleEntrySelection}
            selectedEntries={selectedEntries}
            viewMode={viewMode}
          />
        </Fragment>
      </SideBarLayout>
    </Fragment>
  );
  // }
};

const mapStateToProps = (state: RootState) => {
  return {
    namespace: state.query.namespace,
    tableColumns: state.results.tableColumns,
  };
};

const ResultsContainer = withRouter(connect(mapStateToProps)(Results));

export default ResultsContainer;
