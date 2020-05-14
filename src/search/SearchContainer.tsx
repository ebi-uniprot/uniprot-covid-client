import React, { Component, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { MainSearch } from 'franklin-sites';
import { RootState, RootAction } from '../state/state-types';
import * as searchActions from './state/searchActions';
import './styles/SearchContainer.scss';

type SearchProps = {
  queryString: string;
  dispatchUpdateQueryString: (type: string) => void;
} & RouteComponentProps;

type SearchContainerState = {
  queryString: string;
};

export class Search extends Component<SearchProps, SearchContainerState> {
  constructor(props: SearchProps) {
    super(props);
    const { queryString } = props;
    this.state = { queryString };
    this.handleSubmitClick = this.handleSubmitClick.bind(this);
    this.handleQueryStringChange = this.handleQueryStringChange.bind(this);
  }

  componentDidUpdate(prevProps: SearchProps) {
    const { queryString: prevQueryString } = prevProps;
    const { queryString } = this.props;
    if (prevQueryString !== queryString) {
      this.setState({ queryString });
    }
  }

  handleSubmitClick(e: SyntheticEvent) {
    e.preventDefault();
    const { history, dispatchUpdateQueryString } = this.props;
    const { queryString } = this.state;
    dispatchUpdateQueryString(queryString);
    history.push({ pathname: '/uniprotkb', search: `query=${queryString}` });
  }

  handleQueryStringChange(queryString: string) {
    this.setState({ queryString });
  }

  render() {
    const { queryString } = this.state;
    return (
      <MainSearch
        onSubmit={this.handleSubmitClick}
        onChange={this.handleQueryStringChange}
        searchTerm={queryString}
        namespaces={[
          'UniProtKB - the UniProt knowledgebase',
          'UniRef',
          'UniParc',
          'Proteomes',
          'Publications',
          'Keywords',
        ]}
      />
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  queryString: state.query.queryString,
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      dispatchUpdateQueryString: queryString =>
        searchActions.updateQueryString(queryString),
    },
    dispatch
  );

const SearchContainer = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Search)
);

export default SearchContainer;
