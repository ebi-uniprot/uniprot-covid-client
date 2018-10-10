// @flow
import React, { Component } from 'react';

import axios from 'axios';
import apiUrls from '../apiUrls';

type Props = {
  updateEvidence: Function,
  selectedEvidence?: string,
};

type State = {
  evidenceList: Array<Group>,
};

type Group = {
  groupName: string,
  items: Array<{
    code: string,
    name: string,
  }>,
};

class EvidenceField extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      evidenceList: [],
    };
  }

  componentDidMount() {
    axios
      .get(apiUrls.annotation_evidences)
      .then(data => this.setState({ evidenceList: data.data }))
      .catch(e => console.error(e));
  }

  render() {
    if (this.state.evidenceList.length <= 0) {
      return null;
    }
    return (
      <div className="advanced-search__inputs">
        <label>
          Evidence
          <select value={this.props.selectedEvidence} onChange={e => this.props.updateEvidence(e)}>
            {this.state.evidenceList.map(group => (
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
