import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps, Link } from 'react-router-dom';
import {
  Facets,
  PageIntro,
  DownloadIcon,
  BasketIcon,
  StatisticsIcon,
  TableIcon,
  ListIcon,
  EditIcon,
  Loader,
} from 'franklin-sites';
import queryStringModule from 'query-string';
import * as resultsActions from './state/resultsActions';
import * as searchActions from '../search/state/searchActions';
import { Clause, Namespace } from '../search/types/searchTypes';
import SideBarLayout from '../layout/SideBarLayout';
import ResultsView from './ResultsView';
import { getQueryUrl } from '../utils/apiUrls';
import { uniq } from '../utils/utils';
import infoMappings from '../info/InfoMappings';
import { RootState, RootAction } from '../state/state-types';
import {
  SortDirection,
  SelectedEntries,
  SelectedFacet,
} from './types/resultsTypes';
import { SortableColumn, Column } from '../model/types/ColumnTypes';
import { ViewMode } from './state/resultsInitialState';
import { UniProtkbAPIModel } from '../model/uniprotkb/UniProtkbConverter';
import { Facet } from '../types/responseTypes';

type ResultsProps = {
  namespace: Namespace;
  dispatchFetchBatchOfResultsIfNeeded: (url: string | undefined) => void;
  dispatchResetSearchInput: () => void;
  dispatchClearResults: () => void;
  dispatchSwitchViewMode: () => void;
  dispatchUpdateSummaryAccession: (accession: string) => void;
  dispatchUpdateQueryString: (type: string) => void;
  clauses?: Clause[];
  tableColumns: Column[];
  cardColumns: string[];
  results: UniProtkbAPIModel[];
  facets: Facet[];
  isFetching: boolean;
  nextUrl: string;
  totalNumberResults: number;
  viewMode: ViewMode;
  summaryAccession: string | null;
} & RouteComponentProps;

type ResultsContainerState = {
  selectedEntries: SelectedEntries;
};

export class Results extends Component<ResultsProps, ResultsContainerState> {
  constructor(props: ResultsProps) {
    super(props);
    this.state = { selectedEntries: {} };
  }

  componentDidMount() {
    this.updateData();
  }

  componentDidUpdate(prevProps: ResultsProps) {
    const {
      location: { search: queryParamFromUrl },
    } = this.props;
    if (prevProps.location.search !== queryParamFromUrl) {
      this.updateData();
    }
  }

  componentWillUnmount() {
    const { dispatchResetSearchInput } = this.props;
    dispatchResetSearchInput();
  }

  getURLParams = (
    url: string
  ): {
    query: string;
    selectedFacets: SelectedFacet[];
    sortColumn: SortableColumn;
    sortDirection: SortDirection;
  } => {
    const urlParams = queryStringModule.parse(url);
    const { query, facets, sort, dir } = urlParams;

    let selectedFacets: SelectedFacet[] = [];
    if (facets && typeof facets === 'string') {
      selectedFacets = this.facetsAsArray(facets);
    }
    const sortDirection = dir as keyof typeof SortDirection;

    return {
      query: query && typeof query === 'string' ? query : '',
      selectedFacets,
      sortColumn: sort as SortableColumn,
      sortDirection: sortDirection && SortDirection[sortDirection],
    };
  };

  setURLParams = (
    query: string,
    selectedFacets: SelectedFacet[],
    sortColumn: SortableColumn,
    sortDirection: SortDirection
  ): void => {
    const { history } = this.props;
    history.push({
      pathname: '/uniprotkb',
      search: [
        `query=${query}${this.facetsAsString(selectedFacets)}`,
        `${sortColumn ? `&sort=${sortColumn}` : ''}`,
        `${sortDirection ? `&dir=${sortDirection}` : ''}`,
      ].join(''),
    });
  };

  handleEntrySelection = (rowId: string): void => {
    const { selectedEntries: prevSelectedEntries } = this.state;
    if (rowId in prevSelectedEntries) {
      const { [rowId]: value, ...selectedEntries } = prevSelectedEntries;
      this.setState({ selectedEntries });
    } else {
      prevSelectedEntries[rowId] = true;
      this.setState({ selectedEntries: prevSelectedEntries });
    }
  };

  facetsAsString = (facets: SelectedFacet[]): string => {
    if (!facets || facets.length <= 0) {
      return '';
    }
    return facets.reduce(
      (accumulator, facet, i) =>
        `${accumulator}${i > 0 ? ',' : ''}${facet.name}:${facet.value}`,
      '&facets='
    );
  };

  facetsAsArray = (facetString: string): SelectedFacet[] => {
    return facetString.split(',').map(stringItem => {
      const [name, value] = stringItem.split(':');
      return {
        name,
        value,
      };
    });
  };

  addFacet = (facetName: string, facetValue: string): void => {
    const {
      location: { search: queryParamFromUrl },
    } = this.props;
    const {
      query,
      selectedFacets,
      sortColumn,
      sortDirection,
    } = this.getURLParams(queryParamFromUrl);

    const facet: SelectedFacet = { name: facetName, value: facetValue };

    this.setURLParams(
      query,
      [...selectedFacets.concat(facet)],
      sortColumn,
      sortDirection
    );
  };

  removeFacet = (facetName: string, facetValue: string): void => {
    const {
      location: { search: queryParamFromUrl },
    } = this.props;
    const {
      query,
      selectedFacets,
      sortColumn,
      sortDirection,
    } = this.getURLParams(queryParamFromUrl);

    const index = selectedFacets.findIndex(
      selectedFacet =>
        selectedFacet.name === facetName && selectedFacet.value === facetValue
    );

    selectedFacets.splice(index, 1);

    this.setURLParams(query, selectedFacets, sortColumn, sortDirection);
  };

  updateColumnSort = (column: SortableColumn): void => {
    const {
      location: { search: queryParamFromUrl },
    } = this.props;
    const {
      query,
      selectedFacets,
      sortColumn,
      sortDirection,
    } = this.getURLParams(queryParamFromUrl);

    // Change sort direction
    let updatedDirection = sortDirection;
    if (column === sortColumn) {
      updatedDirection =
        sortDirection === SortDirection.ascend
          ? SortDirection.descend
          : SortDirection.ascend;
    }

    this.setURLParams(query, selectedFacets, column, updatedDirection);
  };

  updateData() {
    const {
      location: { search: queryParamFromUrl },
      tableColumns,
      cardColumns,
      dispatchFetchBatchOfResultsIfNeeded,
      dispatchClearResults,
      dispatchUpdateQueryString,
    } = this.props;
    const {
      query,
      selectedFacets,
      sortColumn,
      sortDirection,
    } = this.getURLParams(queryParamFromUrl);
    // Always fetch at least the card columns so these can be rendered
    // Eg if no columns are selected for the table view ensure sufficient
    // columns will be fetched to render each card.
    const columns = uniq([...cardColumns, ...tableColumns]);
    dispatchClearResults();
    dispatchFetchBatchOfResultsIfNeeded(
      getQueryUrl(query, columns, selectedFacets, sortColumn, sortDirection)
    );
    dispatchUpdateQueryString(query);
  }

  render() {
    const {
      location: { search: queryParamFromUrl },
      results,
      facets,
      isFetching,
      dispatchFetchBatchOfResultsIfNeeded,
      dispatchUpdateSummaryAccession,
      namespace,
      nextUrl,
      totalNumberResults,
      viewMode,
      tableColumns,
      dispatchSwitchViewMode,
      summaryAccession,
    } = this.props;
    const { selectedEntries } = this.state;
    const {
      query,
      selectedFacets,
      sortColumn,
      sortDirection,
    } = this.getURLParams(queryParamFromUrl);
    if (isFetching && !results.length) {
      return <Loader />;
    }
    const { name, links, info } = infoMappings[namespace];
    return (
      <SideBarLayout
        title={
          <PageIntro
            title={name}
            links={links}
            resultsCount={totalNumberResults}
          >
            {info}
          </PageIntro>
        }
        sidebar={
          <Facets
            data={facets}
            selectedFacets={selectedFacets}
            addFacet={this.addFacet}
            removeFacet={this.removeFacet}
          />
        }
      >
        <Fragment>
          {results.length > 0 && (
            <div className="button-group">
              <button type="button" className="button tertiary disabled">
                Blast
              </button>
              <button type="button" className="button tertiary disabled">
                Align
              </button>
              <button type="button" className="button tertiary">
                <Link
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
                </Link>
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
                onClick={() => dispatchSwitchViewMode()}
                data-testid="table-card-toggle"
              >
                <span
                  className={
                    viewMode === ViewMode.CARD ? 'tertiary-icon__active' : ''
                  }
                >
                  <TableIcon />
                </span>
                <span
                  className={
                    viewMode === ViewMode.TABLE ? 'tertiary-icon__active' : ''
                  }
                >
                  <ListIcon />
                </span>
              </button>
              {viewMode === ViewMode.TABLE && (
                <Link to="/customise-table">
                  <button type="button" className="button tertiary">
                    <EditIcon />
                    Customise data
                  </button>
                </Link>
              )}
            </div>
          )}
          <ResultsView
            results={results}
            handleEntrySelection={this.handleEntrySelection}
            selectedEntries={selectedEntries}
            handleHeaderClick={this.updateColumnSort}
            handleCardClick={dispatchUpdateSummaryAccession}
            summaryAccession={summaryAccession}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            handleLoadMoreRows={() =>
              dispatchFetchBatchOfResultsIfNeeded(nextUrl)
            }
            totalNumberResults={totalNumberResults}
            tableColumns={tableColumns}
            viewMode={viewMode}
          />
        </Fragment>
      </SideBarLayout>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    namespace: state.query.namespace,
    tableColumns: state.results.tableColumns,
    cardColumns: state.results.cardColumns,
    results: state.results.results.data,
    facets: state.results.facets,
    isFetching: state.results.results.isFetching,
    nextUrl: state.results.nextUrl,
    totalNumberResults: state.results.totalNumberResults,
    viewMode: state.results.viewMode,
    summaryAccession: state.results.summaryAccession,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      dispatchFetchBatchOfResultsIfNeeded: (url: string | undefined) =>
        resultsActions.fetchBatchOfResultsIfNeeded(url),
      dispatchResetSearchInput: () => searchActions.resetSearchInput(),
      dispatchClearResults: () => resultsActions.clearResults(),
      dispatchSwitchViewMode: () => resultsActions.switchViewMode(),
      dispatchUpdateSummaryAccession: (accession: string) =>
        resultsActions.updateSummaryAccession(accession),
      dispatchUpdateQueryString: queryString =>
        searchActions.updateQueryString(queryString),
    },
    dispatch
  );

const ResultsContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Results)
);

export default ResultsContainer;
