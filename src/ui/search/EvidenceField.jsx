// @flow
import React, { Component } from 'react';
import withData from '../hoc/withData';

type Props = {
  updateEvidence: Function,
  selectedEvidence?: string,
  url: string,
  data: Array<Group>,
};

class EvidenceField extends Component<Props> {
  static defaultProps = {
    selectedEvidence: '',
  };

  render() {
    const { data, selectedEvidence, updateEvidence } = this.props;
    if (!data) {
      return null;
    }
    return (
      <div className="advanced-search__inputs">
        <label htmlFor="evidence_select">
          Evidence
          <select id="evidence_select" value={selectedEvidence} onChange={e => updateEvidence(e)}>
            {data.map(group => (
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

export default withData(props => props.url)(EvidenceField);
