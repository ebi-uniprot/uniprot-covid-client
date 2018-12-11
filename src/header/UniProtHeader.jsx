import React, { Component } from 'react';
import { Header, MainSearch } from 'franklin-sites';
import { Link } from 'react-router-dom';

import AdvancedSearchContainer from '../advanced-search/AdvancedSearchContainer';

import Logo from '../svg/uniprot-rgb.svg';

class UniProtHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdvanced: false,
    };
    this.toggleAdvanced = this.toggleAdvanced.bind(this);
  }

  toggleAdvanced() {
    const { showAdvanced } = this.state;
    this.setState({ showAdvanced: !showAdvanced });
  }

  render() {
    const { showAdvanced } = this.state;
    let search;

    if (showAdvanced) {
      search = <AdvancedSearchContainer />;
    } else {
      search = <MainSearch handleSearchSubmit={() => console.log()} />;
    }

    return (
      <Header>
        <a className="header__logo" href="/">
          <Logo width={120} height={50} />
        </a>
        <ul className="header__navigation">
          <li>
            <Link to="/">BLAST</Link>
          </li>
          <li>
            <Link to="/">Aligh</Link>
          </li>
          <li>
            <Link to="/">Peptide search</Link>
          </li>
          <li>
            <Link to="/">Retrieve/ID Mapping</Link>
          </li>
          <li>
            <Link to="/">API</Link>
          </li>
          <li>
            <Link to="/">Help</Link>
          </li>
        </ul>
        {search}
        <button type="button" onClick={this.toggleAdvanced}>
          Advanced search
        </button>
      </Header>
    );
  }
}

export default UniProtHeader;
