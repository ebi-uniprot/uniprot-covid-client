import React, { Component } from 'react';
import { Autocomplete } from 'franklin-sites';
import { v1 } from 'uuid';
import fetchData from '../utils/fetchData';
import appendUniqueId from './prepareData';
import { getSuggesterUrl } from '../utils/apiUrls';

type Props = {
  url: string;
  onSelect: Function;
};

type Suggestions = {
  dictionary: string;
  query: string;
  suggestions: Array<string>;
};

type State = {
  data: Array<Suggestions>;
};

type Chosen = {
  id: string;
  itemLabel: string;
  pathLabel: string;
};

class AutocompleteWrapper extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { data: [] };
    this.id = v1();
  }

  handleChange = (textInputValue: string) => {
    const { url } = this.props;
    const suggesterUrl = getSuggesterUrl(url, textInputValue);
    this.fetchOptions(suggesterUrl);
  };

  fetchOptions = (url: string) => {
    fetchData(url)
      .then(data => data.data.suggestions.map(x => ({ pathLabel: x, itemLabel: x })))
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
    const { title, value } = this.props;
    return (
      <label htmlFor={this.id}>
        {title}
        <Autocomplete
          id={this.id}
          data={data}
          onSelect={this.handleSelect}
          onChange={this.handleChange}
          filter={false}
          value={value}
        />
      </label>
    );
  }
}

export default AutocompleteWrapper;
