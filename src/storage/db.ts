import { openDB } from "idb"

export const DB_NAME = "offline-notes-db"
export const DB_VERSION = 1
export const RECORD_STORE = "records"

export const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(RECORD_STORE)) {
      db.createObjectStore(RECORD_STORE, {
        keyPath: "id",
      })
    }
  },
})
