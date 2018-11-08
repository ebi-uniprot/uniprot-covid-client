// @flow
import React, { Component } from 'react';
import urljoin from 'url-join';
import { Autocomplete } from 'franklin-sites';
import fetchData from '../hoc/fetchData';
import appendUniqueId from '../hoc/prepareData';

const SERVER = 'http://wwwdev.ebi.ac.uk/';
const RE_QUERY = /\?$/;

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

class AutocompleteWrapper extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { data: [] };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(textInputValue) {
    const { url } = this.props;
    const assembledUrl = urljoin(SERVER, url.replace(RE_QUERY, textInputValue));
    this.fetchOptions(assembledUrl);
  }

  fetchOptions(url) {
    fetchData(url)
      // Remove duplicates for now as there is a bug in the API
      .then(data => [...new Set(data.data.suggestions)])
      .then(data => data.map(x => ({ pathLabel: x, itemLabel: x })))
      .then(data => appendUniqueId(data, 'autocomplete'))
      .then(data => this.setState({ data }))
      .catch(e => console.error(e));
  }

  handleSelect(chosen) {
    const { onSelect } = this.props;
    onSelect(chosen.pathLabel);
  }

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
