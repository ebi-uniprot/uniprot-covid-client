import { renderHook, cleanup } from '@testing-library/react-hooks';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import useDataApi from '../useDataApi';

const url = '/some/path';
let mock;

beforeAll(() => {
  mock = new MockAdapter(axios);
  // test('useFetch performs GET request', async () => {
  // const initialValue = [];
  // const mock = new MockAdapter(axios);
  // const mockData = "response";
  // const url = "http://mock";
  // mock.onGet(url).reply(200, mockData);
  // const { result, waitForNextUpdate } = renderHook(() =>
  //   useFetch(url, initialValue)
  // );
  // expect(result.current.data).toEqual([]);
  // expect(result.current.loading).toBeTruthy();
  // await waitForNextUpdate();
  // expect(result.current.data).toEqual("response");
  // expect(result.current.loading).toBeFalsy();
  // });
});

afterEach(() => {
  mock.reset();
});

afterAll(() => {
  cleanup();
  mock.restore();
});

describe('useDataApi hook', () => {
  test('no URL', async () => {
    const { result } = renderHook(() => useDataApi());

    expect(result.current).toEqual({ loading: false });
  });

  test('no error', async () => {
    mock.onGet(url).reply(200, 'some data');
    const { result, waitForNextUpdate } = renderHook(() => useDataApi(url));

    expect(result.current).toEqual({ loading: true });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      data: 'some data',
      status: 200,
    });
  });

  test('no network', async () => {
    mock.onGet(url).networkError();
    const { result, waitForNextUpdate } = renderHook(() => useDataApi(url));

    expect(result.current).toEqual({ loading: true });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      error: new Error('Network Error'),
    });
  });

  test('404', async () => {
    mock.onGet(url).reply(404);
    const { result, waitForNextUpdate } = renderHook(() => useDataApi(url));

    expect(result.current).toEqual({ loading: true });

    await waitForNextUpdate();

    expect(result.current).toEqual({
      loading: false,
      status: 404,
      error: new Error('Request failed with status code 404'),
    });
  });

  test('cancellation', async () => {
    mock.onGet(url).reply(200, 'some data');
    const { result, unmount } = renderHook(() => useDataApi(url));

    expect(result.current).toEqual({ loading: true });

    unmount();
    // not sure how to test cancellation, but at least make sure there's no
    // error when we cancel before getting data
  });
});
