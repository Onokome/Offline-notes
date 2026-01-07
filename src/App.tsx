import { useState, useEffect } from "react"
import CreateRecord from "./components/CreateRecord"
import RecordList from "./components/RecordList"
import { type RecordItem } from "./types/record"
import { getRecords, saveAllRecords } from "./storage/recordStorage"
import { useOnlineStatus } from "./hooks/useOnlineStatus"
import { syncRecords } from "./hooks/syncService"


function App() {
  const online = useOnlineStatus()
  const [records, setRecords] = useState<RecordItem[]>(getRecords())
  const [searchText, setSearchText] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<RecordItem["category"] | "all">("all")

  useEffect(() => {
  if (!online) return

  const unsynced = records.filter(r => !r.synced)
  if (unsynced.length === 0) return

  (async () => {
    try {
      await syncRecords(unsynced)

      setRecords(prev => {
        const updated = prev.map(r =>
          r.synced ? r : { ...r, synced: true }
        )
        saveAllRecords(updated)
        return updated
      })
    } catch (err) {
      console.error("Sync failed, will retry later", err)
    }
  })()
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [online])


  // Filter records based on searchText and category
  const filteredRecords = records.filter((record) => {
    const matchesText =
      record.title.toLowerCase().includes(searchText.toLowerCase()) ||
      record.description.toLowerCase().includes(searchText.toLowerCase())

    const matchesCategory = categoryFilter === "all" || record.category === categoryFilter

    return matchesText && matchesCategory
  })

  return (
    <>
  

    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Offline Notes</h1>

        <div className="flex items-center justify-between mb-4">
  <span
    className={`text-sm font-medium ${
      online ? "text-green-600" : "text-red-600"
    }`}
  >
    {online ? "Online" : "Offline"}
  </span>

  <span className="text-sm text-gray-600">
    Unsynced records: {records.filter(r => !r.synced).length}
  </span>
</div>


        {/* Create Record Form */}
        <CreateRecord setRecords={setRecords} />

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mt-8 mb-4 gap-4">
          <input
            type="text"
            placeholder="Search by title or description"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value as RecordItem["category"] | "all")}
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Record List */}
        <RecordList records={filteredRecords} />
      </div>
    </div>
</>
  )
}


export default App
