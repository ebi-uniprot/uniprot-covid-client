import { Store, set, get, del, clear, keys } from 'idb-keyval';

import { Stores } from './stores';

export const DB_NAME = 'UniProt-Jobs';

export default class JobStore {
  #store: Store;

  constructor(storeName: Stores) {
    this.#store = new Store(DB_NAME, storeName);
  }

  async get(key: IDBValidKey) {
    return get(key, this.#store);
  }

  async *getAll() {
    const allKeys = await this.keys();
    for (const key of allKeys) {
      yield this.get(key);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async set(key: IDBValidKey, value: any) {
    // TODO: uncomment when we have finished coding
    // return set(key, value, this.#store);
  }

  async del(key: IDBValidKey) {
    return del(key, this.#store);
  }

  async clear() {
    return clear(this.#store);
  }

  async keys() {
    return keys(this.#store);
  }
}
