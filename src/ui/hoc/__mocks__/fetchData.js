import apiUrls from '../../apiUrls';

export default jest.fn((url) => {
  let data = '';
  switch (url) {
    case apiUrls.advanced_search_terms:
      break;
    case apiUrls.annotation_evidences:
      data = [{ groupName: 'group 1', items: [{ name: 'name 1', code: 'c1' }] }];
      break;
    case apiUrls.go_evidences:
      break;
    default:
      data = { test: 'default' };
  }
  return Promise.resolve({ data });
});
