import { Store, set, get, del, clear, keys } from 'idb-keyval';

export const DB_NAME = 'UniProt-Jobs';

export default class JobStore {
  private _store: Store;

  constructor(storeName: string) {
    this._store = new Store(DB_NAME, storeName);
  }

  async get(key: IDBValidKey) {
    return get(key, this._store);
  }

  async *getAll() {
    const keys = await this.keys();
    for (const key of keys) {
      yield this.get(key);
    }
  }

  async set(key: IDBValidKey, value: any) {
    return set(key, value, this._store);
  }

  async del(key: IDBValidKey) {
    return del(key, this._store);
  }

  async clear() {
    return clear(this._store);
  }

  async keys() {
    return keys(this._store);
  }
}
