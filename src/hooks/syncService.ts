import { type RecordItem } from "../types/record"

export async function syncRecords(records: RecordItem[]) {
  // simulate network delay
  await new Promise(res => setTimeout(res, 1500))

  // simulate random failure (20% chance)
  if (Math.random() < 0.2) {
    throw new Error("Network error")
  }

  return {
    success: true,
    syncedIds: records.map(r => r.id),
  }
}
