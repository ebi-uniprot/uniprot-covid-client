import React, { Component, Fragment } from 'react';
import urljoin from 'url-join';
import { Autocomplete } from 'franklin-sites';
import fetchData from '../hoc/fetchData';
import appendUniqueId from '../hoc/prepareData';

const SERVER = 'http://wwwdev.ebi.ac.uk/';
const RE_QUERY = /\?$/;

class AutocompleteWrapper extends Component {
  constructor(props) {
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
    fetchData(url).then((data) => {
      return data.data.suggestions;
    }).then(data => [...new Set(data)])
      .then(data => data.map(x => ({ pathLabel: x, itemLabel: x })))
      .then(data => appendUniqueId(data, 'autocomplete'))
      .then((data) => {
        this.setState({ data });
      })
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
