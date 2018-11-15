import React from 'react';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import AdvancedSearch from '../../../src/ui/containers/AdvancedSearch';

configure({ adapter: new Adapter() });

describe('AdvancedSearch component', () => {
  test('should render', () => {
    const component = renderer.create(<AdvancedSearch />).toJSON();
    expect(component).toMatchSnapshot();
  });

  test('should add/remove field rows', () => {
    const wrapper = mount(<AdvancedSearch />);
    expect(wrapper.find('.advanced-search__field')).toHaveLength(4);
    wrapper.find('#add-field').simulate('click');
    expect(wrapper.find('.advanced-search__field')).toHaveLength(5);
    wrapper
      .find('.button-remove')
      .first()
      .simulate('click');
    expect(wrapper.find('.advanced-search__field')).toHaveLength(4);
  });
});
