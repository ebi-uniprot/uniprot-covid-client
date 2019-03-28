import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Facets, PageIntro } from 'franklin-sites';
import * as resultsActions from './state/actions';
import * as searchActions from '../search/state/actions';
import { default as queryStringModule } from 'query-string';
import { Clause, Namespace } from '../search/types/searchTypes';
import SideBarLayout from '../layout/SideBarLayout';
import ResultsTable from './ResultsTable';
import { getAPIQueryUrl } from './utils/utils';
import infoMappings from '../info/InfoMappings';
import { RootState, RootAction } from '../state/state-types';
import {
  SortDirection,
  SortableColumn,
  SelectedRows,
  SelectedFacet,
} from './types/resultsTypes';

interface ResultsProps extends RouteComponentProps {
  namespace: Namespace;
  dispatchFetchBatchOfResultsIfNeeded: (url: string | undefined) => void;
  dispatchReset: () => void;
  dispatchClearResults: () => void;
  clauses?: Clause[];
  columns: string[];
  results: any[];
  facets: any[];
  isFetching: boolean;
  nextUrl: string;
  totalNumberResults: number;
}

type ResultsContainerState = {
  selectedRows: SelectedRows;
};

export class Results extends Component<ResultsProps, ResultsContainerState> {
  constructor(props: ResultsProps) {
    super(props);
    this.state = { selectedRows: {} };
    this.handleRowSelect = this.handleRowSelect.bind(this);
  }

  componentDidMount() {
    const {
      location: { search: queryParamFromUrl },
      columns,
      dispatchFetchBatchOfResultsIfNeeded,
      dispatchClearResults,
    } = this.props;
    const {
      query,
      selectedFacets,
      sortColumn,
      sortDirection,
    } = this.getURLParams(queryParamFromUrl);
    dispatchClearResults();
    dispatchFetchBatchOfResultsIfNeeded(
      getAPIQueryUrl(query, columns, selectedFacets, sortColumn, sortDirection)
    );
  }

  componentDidUpdate(prevProps: ResultsProps) {
    const {
      location: { search: queryParamFromUrl },
      columns,
      dispatchFetchBatchOfResultsIfNeeded,
      dispatchClearResults,
    } = this.props;
    if (prevProps.location.search !== queryParamFromUrl) {
      const {
        query,
        selectedFacets,
        sortColumn,
        sortDirection,
      } = this.getURLParams(queryParamFromUrl);
      dispatchClearResults();
      dispatchFetchBatchOfResultsIfNeeded(
        getAPIQueryUrl(
          query,
          columns,
          selectedFacets,
          sortColumn,
          sortDirection
        )
      );
    }
  }

  componentWillUnmount() {
    const { dispatchReset } = this.props;
    dispatchReset();
  }

  getURLParams = (url: string) => {
    const urlParams = queryStringModule.parse(url);
    const { query, facets, sort, dir } = urlParams;

    let selectedFacets;
    if (facets && typeof facets === 'string') {
      selectedFacets = this.getSelectedFacetsFromString(facets);
    }

    const sortColumn = sort as keyof typeof SortableColumn;
    const sortDirection = dir as keyof typeof SortDirection;

    return {
      query: query && typeof query === 'string' ? query : '',
      selectedFacets: selectedFacets || [],
      sortColumn: sortColumn && SortableColumn[sortColumn],
      sortDirection: sortDirection && SortDirection[sortDirection],
    };
  };

  setURLParams = (
    query: string,
    selectedFacets: SelectedFacet[],
    sortColumn: SortableColumn,
    sortDirection: SortDirection
  ) => {
    const { history } = this.props;
    history.push({
      pathname: '/uniprotkb',
      search: `query=${query}${this.facetsAsString(selectedFacets)}${
        sortColumn ? `&sort=${sortColumn}` : ''
      }${sortDirection ? `&dir=${sortDirection}` : ''}`,
    });
  };

  handleRowSelect(rowId: string) {
    const { selectedRows: prevSelectedRows } = this.state;
    if (rowId in prevSelectedRows) {
      const { [rowId]: value, ...selectedRows } = prevSelectedRows;
      this.setState({ selectedRows });
    } else {
      prevSelectedRows[rowId] = true;
      this.setState({ selectedRows: prevSelectedRows });
    }
  }

  facetsAsString = (facets: SelectedFacet[]) => {
    if (!facets || facets.length <= 0) {
      return '';
    }
    return facets.reduce(
      (accumulator, facet, i) =>
        `${accumulator}${i > 0 ? ',' : ''}${facet.name}:${facet.value}`,
      '&facets='
    );
  };

  getSelectedFacetsFromString = (facetString: string): SelectedFacet[] => {
    return facetString.split(',').map(stringItem => {
      const item = stringItem.split(':');
      return {
        name: item[0],
        value: item[1],
      };
    });
  };

  addFacet = (facetName: string, facetValue: string) => {
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
      [...selectedFacets.slice(0, selectedFacets.length), facet],
      sortColumn,
      sortDirection
    );
  };

  removeFacet = (facetName: string, facetValue: string) => {
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

    this.setURLParams(
      query,
      [...selectedFacets.slice(0, index), ...selectedFacets.slice(index + 1)],
      sortColumn,
      sortDirection
    );
  };

  updateColumnSort = (column: SortableColumn) => {
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

  render() {
    const {
      location: { search: queryParamFromUrl },
      results,
      facets,
      isFetching,
      columns,
      dispatchFetchBatchOfResultsIfNeeded,
      namespace,
      nextUrl,
      totalNumberResults,
    } = this.props;
    const { selectedRows } = this.state;
    const { selectedFacets, sortColumn, sortDirection } = this.getURLParams(
      queryParamFromUrl
    );
    if (isFetching && results.length === 0) {
      return <h3>Loading...</h3>;
    }
    const { name, links, info } = infoMappings[namespace];
    return (
      <Fragment>
        <SideBarLayout
          title={
            <PageIntro title={name} links={links}>
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
          content={
            results.length ? (
              <ResultsTable
                results={results}
                columnNames={columns}
                handleRowSelect={this.handleRowSelect}
                selectedRows={selectedRows}
                handleHeaderClick={this.updateColumnSort}
                sortColumn={sortColumn}
                sortDirection={sortDirection}
                handleLoadMoreRows={() =>
                  dispatchFetchBatchOfResultsIfNeeded(nextUrl)
                }
                totalNumberResults={totalNumberResults}
              />
            ) : (
              // This loading indicator is temporary. UX will decide at some
              // future date what site-wide indicator will be used.
              <div style={{ fontSize: '2rem', paddingLeft: '2rem' }}>
                Loading...
              </div>
            )
          }
        />
      </Fragment>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  namespace: state.query.namespace,
  columns: state.results.columns,
  results: state.results.results,
  facets: state.results.facets,
  isFetching: state.results.isFetching,
  nextUrl: state.results.nextUrl,
  totalNumberResults: state.results.totalNumberResults,
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      dispatchFetchBatchOfResultsIfNeeded: (url: string | undefined) =>
        resultsActions.fetchBatchOfResultsIfNeeded(url),
      dispatchReset: () => searchActions.reset(),
      dispatchClearResults: () => resultsActions.clearResults(),
    },
    dispatch
  );

const ResultsContainer = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Results)
);

export default ResultsContainer;
