export type RecordStatus = "active" | "deleted"

export type RecordItem = {
  id: string
  title: string
  description: string
  category: "personal" | "work" | "other"
  createdAt: number
  updatedAt?: number
  synced: boolean
  status: RecordStatus
  lastSyncedAt?: number 
}
