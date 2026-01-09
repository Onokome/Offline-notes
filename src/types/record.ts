export type RecordItem = {
  id: string
  title: string
  description: string
  category: "personal" | "work" | "other"
  createdAt: number
  synced: boolean
  lastSyncedAt?: number 
}
