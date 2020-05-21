import { Store, set, get, del, clear, keys } from 'idb-keyval';

const DB_NAME = 'UniProt-Jobs';

export default class JobStore {
  private _store: Store;

  constructor(storeName: string) {
    this._store = new Store(DB_NAME, storeName);
  }

  async get(key: string) {
    return get(key, this._store);
  }

  async set(key: string, value: any) {
    return set(key, value, this._store);
  }

  async del(key: string) {
    return del(key, this._store);
  }

  async clear() {
    return clear(this._store);
  }

  async keys() {
    return keys(this._store);
  }
}
