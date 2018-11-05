import React, { Component, Fragment } from 'react';
import { Autocomplete } from 'franklin-sites';
// import withData from '../hoc/withData';

class AutocompleteWrapper extends Component {
  constructor(props) {
    super(props);
    // this.handleSelect = this.handleSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (value) => {
    console.log(value);
  }

  render() {
    return (
      <Autocomplete
        data={[]}
        // onSelect={e => this.handleSelect(e)}
        onChange={v => this.handleChange(v)}
      />
    );
  }
}

export default AutocompleteWrapper;
// export default withData(url, appendUniqueValue)(EvidenceField);