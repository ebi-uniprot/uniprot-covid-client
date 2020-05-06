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
import { SelectedEntries } from './types/resultsTypes';
import { ViewMode } from './state/resultsInitialState';
import { Column } from '../model/types/ColumnTypes';
import { getAPIQueryUrl } from '../utils/apiUrls';
import { getURLParams } from './utils';
import ResultsFacets from './ResultsFacets';
import useDataApi from '../hooks/useDataApi';

type ResultsProps = {
  namespace: Namespace;
  clauses?: Clause[];
} & RouteComponentProps;

type ResultsContainerState = {
  selectedEntries: SelectedEntries;
};

const Results: FC<ResultsProps> = ({ namespace, location }) => {
  const [selectedEntries, setSelectedEntries] = useState({});
  const [viewMode, setViewMode] = useState(ViewMode.CARD);

  const { search: queryParamFromUrl } = location;
  const { query, selectedFacets, sortColumn, sortDirection } = getURLParams(
    queryParamFromUrl
  );

  /**
   * WARNING: horrible hack to get the switch between
   * table and cards to work while we wait for the backend
   * to generate a column for card counts and we refactor
   * this class as a functional component and put all url
   * parameters in the store.
   */
  const columns: Column[] = [];

  const initialUrl = getAPIQueryUrl(
    query,
    columns,
    selectedFacets,
    sortColumn,
    sortDirection
  );

  const { data, error, loading, headers } = useDataApi(initialUrl);

  if (error) {
    // TODO handle error with ErrorPage
  }

  if (loading) {
    return <Loader />;
  }

  const { facets } = data;
  const total = headers['x-totalrecords'];

  // const handleEntrySelection = (rowId: string): void => {
  //   const { selectedEntries: prevSelectedEntries } = this.state;
  //   if (rowId in prevSelectedEntries) {
  //     const { [rowId]: value, ...selectedEntries } = prevSelectedEntries;
  //     setSelectedEntries(selectedEntries );
  //   } else {
  //     prevSelectedEntries[rowId] = true;
  //     setSelectedEntries(prevSelectedEntries );
  //   }
  // };

  // const updateColumnSort = (column: SortableColumn): void => {
  //   const {
  //     location: { search: queryParamFromUrl },
  //   } = this.props;
  //   const {
  //     query,
  //     selectedFacets,
  //     sortColumn,
  //     sortDirection,
  //   } = getURLParams(queryParamFromUrl);

  //   /**
  //    * NOTE: temporary fix until backend provide
  //    * the correct name for sort fields
  //    * https://www.ebi.ac.uk/panda/jira/browse/TRM-23753
  //    */
  //   const fieldNameMap = new Map([
  //     [Column.accession, 'accession'],
  //     [Column.id, 'mnemonic'],
  //     [Column.proteinName, 'name'],
  //     [Column.geneNames, 'gene'],
  //     [Column.organism, 'organism_name'],
  //     [Column.mass, 'mass'],
  //     [Column.length, 'length'],
  //   ]);
  //   const apiColumn = fieldNameMap.get(column);

  //   // Change sort direction
  //   let updatedDirection = sortDirection;
  //   if (apiColumn === sortColumn) {
  //     updatedDirection =
  //       sortDirection === SortDirection.ascend
  //         ? SortDirection.descend
  //         : SortDirection.ascend;
  //   }

  //   setURLParams(query, selectedFacets, apiColumn, updatedDirection);
  // };

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
            initialUrl={initialUrl}
            handleEntrySelection={() => null}
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
    columns: state.results.tableColumns,
  };
};

const ResultsContainer = withRouter(connect(mapStateToProps)(Results));

export default ResultsContainer;
