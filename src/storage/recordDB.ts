import { dbPromise, RECORD_STORE } from "./db"
import {type  RecordItem } from "../types/record"

// Save or update ONE record
export async function saveRecord(record: RecordItem) {
  const db = await dbPromise
  await db.put(RECORD_STORE, record)
}

// Get ALL records
export async function getAllRecords(): Promise<RecordItem[]> {
  const db = await dbPromise
  return db.getAll(RECORD_STORE)
}

// Get only UNSYNCED records
export async function getUnsyncedRecords(): Promise<RecordItem[]> {
  const db = await dbPromise
  const all = await db.getAll(RECORD_STORE)
  return all.filter(record => !record.synced)
}


export async function markRecordsAsSynced(ids: string[]) {
  const db = await dbPromise
  const tx = db.transaction(RECORD_STORE, "readwrite")
  const store = tx.objectStore(RECORD_STORE)

  for (const id of ids) {
    const record = await store.get(id)
    if (record) {
      record.synced = true
      record.lastSyncedAt = Date.now()
      await store.put(record)
    }
  }

  await tx.done
}
