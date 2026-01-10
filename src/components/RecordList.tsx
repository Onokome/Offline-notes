import { type RecordItem } from "../types/record"
import { EditableRecord } from "./EditableRecord"

interface Props {
  records: RecordItem[]
  onUpdate: (record: RecordItem) => void
  onDelete: (id: string) => void;
}

export default function RecordList({ records, onUpdate, onDelete }: Props) {
  if (records.length === 0) return <p>No records yet.</p>

  return (
    <ul className="space-y-4 mt-6">
      {records.map(record => (
        <EditableRecord
          key={record.id}
          record={record}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
