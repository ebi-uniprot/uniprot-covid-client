// @flow
import React, { Component } from 'react';

import axios from 'axios';

type Props = {
  updateEvidence: Function,
  selectedEvidence?: string,
  url: string,
};

type Group = {
  groupName: string,
  items: Array<{
    code: string,
    name: string,
  }>,
};

type State = {
  evidenceList: Array<Group>,
};

class EvidenceField extends Component<Props, State> {
  static defaultProps = {
    selectedEvidence: '',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      evidenceList: [],
    };
  }

  componentDidMount() {
    const { url } = this.props;
    console.log(url);
    axios
      .get(url)
      .then(data => this.setState({ evidenceList: data.data }))
      .catch(e => console.error(e));
  }

  render() {
    const { evidenceList } = this.state;
    const { selectedEvidence, updateEvidence } = this.props;
    if (evidenceList.length <= 0) {
      return null;
    }
    return (
      <div className="advanced-search__inputs">
        <label htmlFor="evidence_select">
          Evidence
          <select id="evidence_select" value={selectedEvidence} onChange={e => updateEvidence(e)}>
            {evidenceList.map(group => (
              <optgroup label={group.groupName} key={group.groupName}>
                {group.items.map(item => (
                  <option value={item.code} key={item.code}>
                    {item.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
      </div>
    );
  }
}

export default EvidenceField;
