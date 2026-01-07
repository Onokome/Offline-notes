import { type RecordItem } from "../types/record";

const STORAGE_KEY = "offline-records"

export function getRecords() : RecordItem[] {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
}

export function saveRecord(record : RecordItem) {
    const records = getRecords()
    records.unshift(record)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}

export function saveAllRecords(records: RecordItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records))
}