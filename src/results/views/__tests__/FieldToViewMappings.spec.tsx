import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FieldToViewMappings from '../FieldToViewMappings';

configure({ adapter: new Adapter() });

describe('FieldToViewMappings', () => {
  test('should render protein_name', () => {
    const data = {
      proteinDescription: {
        recommendedName: {
          fullName: {
            value: 'My protein',
          },
        },
        shortNames: [
          {
            value: 'My prot',
          },
        ],
        ecNumbers: [
          {
            value: 'ec1234',
          },
        ],
        alternativeNames: [
          {
            fullName: {
              value: 'Some protein',
            },
          },
        ],
      },
    };
    const component = FieldToViewMappings.protein_name(data);
    const wrapper = shallow(component);
    expect(wrapper.debug()).toMatchSnapshot();
  });

  test('should render gene_names', () => {
    const data = {
      genes: [
        {
          geneName: {
            value: 'My gene',
          },
          synonyms: [{ value: 'synonym 1' }, { value: 'synonym 2' }],
          orfNames: [
            { value: 'orfNames 1' },
            { value: 'orfNames 2' },
            { value: 'orfNames 3' },
          ],
        },
      ],
    };
    const component = FieldToViewMappings.gene_names(data);
    const wrapper = shallow(component);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
