import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import apiUrls from '../../../src/ui/apiUrls';
import EvidenceField from '../../../src/ui/components/EvidenceField';

configure({ adapter: new Adapter() });

describe('EvidenceField component', () => {
  test('should render', () => {
    const component = renderer
      .create(<EvidenceField url={apiUrls.annotation_evidences} />)
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  test('should fire change function on selection', () => {
    const updateEvidence = jest.fn(() => {});
    const wrapped = mount(
      <EvidenceField url={apiUrls.annotation_evidences} updateEvidence={updateEvidence} />,
    );
    wrapped
      .find('#evidence_select')
      .first()
      .simulate('change');
    expect(updateEvidence).toHaveBeenCalled();
  });

  test('should set selectedEvidence in the props', () => {
    const selectedEvidence = 'c1';
    const wrapped = shallow(
      <EvidenceField url={apiUrls.annotation_evidences} selectedEvidence={selectedEvidence} />,
    );
    expect(wrapped.instance().props.selectedEvidence).toBe(selectedEvidence);
  });
});
