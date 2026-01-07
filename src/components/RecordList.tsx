import { type RecordItem } from "../types/record"

interface Props {
  records: RecordItem[]
}

export default function RecordList({ records }: Props) {
  if (records.length === 0) return <p>No records yet.</p>

  return (
    <div>
      <h2>Offline Records</h2>
      <ul className="space-y-4 mt-6">
      {records.map((record) => (
        <li
          key={record.id}
          className="border rounded-lg p-4 flex justify-between items-start"
        >
          <div>
            <h3 className="font-semibold text-lg">{record.title}</h3>
            <p className="text-sm text-gray-600">{record.description}</p>
            <span className="text-xs text-gray-400 capitalize">
              {record.category}
            </span>
          </div>

          {/* Sync status */}
          <div className="flex items-center gap-2">
            <span
              className={`h-3 w-3 rounded-full ${
                record.synced ? "bg-green-500" : "bg-yellow-400"
              }`}
            />
            <span className="text-xs text-gray-500">
              {record.synced ? "Synced" : "Pending"}
            </span>
          </div>
        </li>
      ))}
    </ul>

    </div>
  )
}
