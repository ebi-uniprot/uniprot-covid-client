import JobStore, { DB_NAME } from '../storage';
import { Store, set, get, clear, keys } from 'idb-keyval';
import 'fake-indexeddb/auto';

describe('JobStore', () => {
  const storeName = 'storage-test';
  const jobStore = new JobStore(storeName);
  const idbStore = new Store(DB_NAME, storeName);

  beforeEach(() => {
    clear(idbStore);
    set('a', 1, idbStore);
    set('b', { key: 'value' }, idbStore);
  });

  afterAll(() => {
    clear(idbStore);
  });

  it('should set value for key', async () => {
    const key = 'some key';
    const value = { foo: 'bar', baz: 12345 };
    await jobStore.set(key, value);
    expect(await get(key, idbStore)).toEqual(value);
  });

  it('should get value for key', async () => {
    expect(await jobStore.get('a')).toEqual(1);
  });

  it('should get all', async () => {
    const values = [];
    for await (const value of jobStore.getAll()) {
      values.push(value);
    }
    expect(values).toEqual([1, { key: 'value' }]);
  });

  it('should delete key and corresponding value', async () => {
    await jobStore.del('a');
    expect(await get('a', idbStore)).toBeUndefined();
  });

  it('should return all keys', async () => {
    expect(await jobStore.keys()).toEqual(await keys(idbStore));
  });

  it('should clear the store', async () => {
    await jobStore.clear();
    expect(await keys(idbStore)).toEqual([]);
  });
});
