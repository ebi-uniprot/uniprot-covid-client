import React, { FC, Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
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
import { Clause, Namespace } from '../search/types/searchTypes';
import SideBarLayout from '../layout/SideBarLayout';
import ResultsView from './ResultsView';
import { getQueryUrl } from '../utils/apiUrls';
import infoMappings from '../info/InfoMappings';
import { RootState } from '../state/state-types';
import {
  SortDirection,
  SelectedEntries,
  SelectedFacet,
} from './types/resultsTypes';
import { SortableColumn, Column } from '../model/types/ColumnTypes';
import { ViewMode, defaultTableColumns } from './state/resultsInitialState';
import { UniProtkbAPIModel } from '../model/uniprotkb/UniProtkbConverter';
import { Facet } from '../types/responseTypes';
import BaseLayout from '../layout/BaseLayout';
import NoResultsPage from '../pages/errors/NoResultsPage';
import useDataApi from '../hooks/useDataApi';
import getNextUrlFromResponse from '../utils/queryUtils';

type ResultsProps = {
  namespace: Namespace;
  clauses?: Clause[];
  tableColumns: Column[];
  results: UniProtkbAPIModel[];
  facets: Facet[];
  isFetching: boolean;
  nextUrl: string;
  totalNumberResults: number;
  viewMode: ViewMode;
} & RouteComponentProps;

type ResultsContainerState = {
  selectedEntries: SelectedEntries;
};

const facetsAsArray = (facetString: string): SelectedFacet[] => {
  return facetString.split(',').map((stringItem) => {
    const [name, value] = stringItem.split(':');
    return {
      name,
      value,
    };
  });
};

const getURLParams = (
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
    selectedFacets = facetsAsArray(facets);
  }
  const sortDirection = dir as keyof typeof SortDirection;

  return {
    query: query && typeof query === 'string' ? query : '',
    selectedFacets,
    sortColumn: sort as SortableColumn,
    sortDirection: sortDirection && SortDirection[sortDirection],
  };
};

const Results: FC<ResultsProps> = ({ location, namespace }) => {
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

  const stringUrl = getQueryUrl(
    query,
    columns,
    selectedFacets,
    sortColumn,
    sortDirection
  );
  const [url, setUrl] = useState(stringUrl);
  const [total, setTotal] = useState(0);
  const [selectedEntries, setSelectedEntries] = useState({});
  const [viewMode, setViewMode] = useState(ViewMode.CARD);
  const [allResults, setAllResults] = useState<UniProtkbAPIModel[]>([]);

  // const {
  //   location: { search: queryParamFromUrl },
  //   dispatchUpdateQueryString,
  // } = this.props;
  const { data, error, loading, headers } = useDataApi(url);

  useEffect(() => {
    if (!data) {
      return;
    }
    const { results } = data;
    setAllResults((allRes) => [...allRes, ...results]);
    setTotal(() => headers['x-totalrecords']);
  }, [data, headers]);

  if (loading) {
    return <Loader />;
  }

  const { link } = headers;
  const nextUrl = getNextUrlFromResponse(link);

  // componentDidUpdate(prevProps: ResultsProps) {
  //   const {
  //     location: { search: queryParamFromUrl },
  //   } = this.props;
  //   if (prevProps.location.search !== queryParamFromUrl) {
  //     this.updateData();
  //   }
  // }

  // componentWillUnmount() {
  //   const { dispatchResetSearchInput } = this.props;
  //   dispatchResetSearchInput();
  // }

  // const setURLParams = (
  //   query: string,
  //   selectedFacets: SelectedFacet[],
  //   sortColumn?: string,
  //   sortDirection?: SortDirection
  // ): void => {
  //   const { history } = this.props;
  //   history.push({
  //     pathname: '/uniprotkb',
  //     search: [
  //       `query=${query}${this.facetsAsString(selectedFacets)}`,
  //       `${sortColumn ? `&sort=${sortColumn}` : ''}`,
  //       `${sortDirection ? `&dir=${sortDirection}` : ''}`,
  //     ].join(''),
  //   });
  // };

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

  // const facetsAsString = (facets: SelectedFacet[]): string => {
  //   if (!facets || facets.length <= 0) {
  //     return '';
  //   }
  //   return facets.reduce(
  //     (accumulator, facet, i) =>
  //       `${accumulator}${i > 0 ? ',' : ''}${facet.name}:${facet.value}`,
  //     '&facets='
  //   );
  // };

  // const addFacet = (facetName: string, facetValue: string): void => {
  //   const {
  //     location: { search: queryParamFromUrl },
  //   } = this.props;
  //   const {
  //     query,
  //     selectedFacets,
  //     sortColumn,
  //     sortDirection,
  //   } = getURLParams(queryParamFromUrl);

  //   const facet: SelectedFacet = { name: facetName, value: facetValue };

  //   setURLParams(
  //     query,
  //     [...selectedFacets.concat(facet)],
  //     sortColumn,
  //     sortDirection
  //   );
  // };

  // const removeFacet = (facetName: string, facetValue: string): void => {
  //   const {
  //     location: { search: queryParamFromUrl },
  //   } = this.props;
  //   const {
  //     query,
  //     selectedFacets,
  //     sortColumn,
  //     sortDirection,
  //   } = getURLParams(queryParamFromUrl);

  //   const index = selectedFacets.findIndex(
  //     selectedFacet =>
  //       selectedFacet.name === facetName && selectedFacet.value === facetValue
  //   );

  //   selectedFacets.splice(index, 1);
  //   setURLParams(query, selectedFacets, sortColumn, sortDirection);
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

  // render() {
  //   const {
  //     location: { search: queryParamFromUrl },
  //     results,
  //     facets,
  //     isFetching,
  //     dispatchFetchBatchOfResultsIfNeeded,
  //     namespace,
  //     nextUrl,
  //     totalNumberResults,
  //     viewMode,
  //     tableColumns,
  //     dispatchSwitchViewMode,
  //   } = this.props;
  //   const { selectedEntries } = this.state;
  //   const {
  //     query,
  //     selectedFacets,
  //     sortColumn,
  //     sortDirection,
  //   } = this.getURLParams(queryParamFromUrl);

  const { results, facets } = data;

  if (results.length === 0) {
    return (
      <BaseLayout>
        <NoResultsPage />
      </BaseLayout>
    );
  }

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
        sidebar={
          <Facets
            data={facets}
            selectedFacets={selectedFacets}
            addFacet={() => null}
            removeFacet={() => null}
          />
        }
      >
        <Fragment>
          <ResultsView
            results={allResults}
            handleEntrySelection={() => null}
            selectedEntries={selectedEntries}
            handleHeaderClick={() => null}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
            handleLoadMoreRows={() => nextUrl && setUrl(nextUrl)}
            totalNumberResults={total}
            tableColumns={defaultTableColumns}
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
  };
};

const ResultsContainer = withRouter(connect(mapStateToProps)(Results));

export default ResultsContainer;
