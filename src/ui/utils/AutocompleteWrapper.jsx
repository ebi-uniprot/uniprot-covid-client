// @flow
import React, { Component } from 'react';
import { Autocomplete } from 'franklin-sites';
import fetchData from './fetchData';
import appendUniqueId from './prepareData';
import { getSuggesterUrl } from '../apiUrls';

type Props = {
  url: string,
  onSelect: Function,
};

type Suggestions = {
  dictionary: string,
  query: string,
  suggestions: Array<string>,
};

type State = {
  data: Array<Suggestions>,
};

type Chosen = {
  id: string,
  itemLabel: string,
  pathLabel: string,
};

class AutocompleteWrapper extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { data: [] };
  }

  handleChange = (textInputValue: string) => {
    const { url } = this.props;
    const suggesterUrl = getSuggesterUrl(url, textInputValue);
    this.fetchOptions(suggesterUrl);
  };

  fetchOptions = (url: string) => {
    fetchData(url)
      // Remove duplicates for now as there is a bug in the API
      .then(data => [...new Set(data.data.suggestions)])
      .then(data => data.map(x => ({ pathLabel: x, itemLabel: x })))
      .then(data => appendUniqueId(data, 'autocomplete'))
      .then(data => this.setState({ data }))
      .catch(e => console.error(e));
  };

  handleSelect = (chosen: Chosen) => {
    const { onSelect } = this.props;
    onSelect(chosen.pathLabel);
  };

  render() {
    const { data } = this.state;
    return (
      <Autocomplete
        data={data}
        onSelect={this.handleSelect}
        onChange={this.handleChange}
        filter={false}
      />
    );
  }
}

export default AutocompleteWrapper;
