import { type RecordItem } from "../types/record"

export async function syncRecords(records: RecordItem[]) {
  // Simulate network delay
  await new Promise(res => setTimeout(res, 1000))

  // Simulate server success
  return {
    success: true,
    syncedIds: records.map(r => r.id),
  }
}
