import React, { Component } from 'react';
import { Autocomplete } from 'franklin-sites';
import { v1 } from 'uuid';
import fetchData from '../utils/fetchData';
import { getSuggesterUrl } from '../utils/apiUrls';

type Props = {
  url: string;
  onSelect: Function;
  title: string;
  value?: string;
};

type Suggestion = {
  value: string;
  id: string;
};

type Suggestions = {
  dictionary: string;
  query: string;
  suggestions: Array<Suggestion>;
};

type State = {
  data: Array<Suggestions>;
};

type Chosen = {
  id: string;
  itemLabel: string;
  pathLabel: string;
  apiId: string;
};

class AutocompleteWrapper extends Component<Props, State> {
  id: string;
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
      .then(data =>
        data.data.suggestions.map((suggestion: Suggestion) => ({
          pathLabel: suggestion.value,
          itemLabel: suggestion.value,
          apiId: suggestion.id,
          id: v1(),
        }))
      )
      .then(data => this.setState({ data }))
      .catch(e => console.error(e));
  };

  handleSelect = (chosen: Chosen | string) => {
    const { onSelect } = this.props;
    if (typeof chosen === 'string') {
      onSelect(chosen);
    } else {
      onSelect(chosen.pathLabel, chosen.apiId);
    }
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
