import { useState } from "react"
import { type RecordItem } from "../types/record"
import { v4 as uuidv4 } from "uuid"
import { saveRecord } from "../storage/recordDB"

interface Props {
  setRecords: React.Dispatch<React.SetStateAction<RecordItem[]>>
}

export default function CreateRecord({ setRecords }: Props) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState<RecordItem["category"]>("personal")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!title.trim() || !description.trim()) return

    const newRecord: RecordItem = {
      id: uuidv4(),
      title,
      description,
      category,
      createdAt: Date.now(),
      synced: false,
    }

    setRecords(prev => [newRecord, ...prev])

    try {
    await saveRecord(newRecord)
  } catch (err) {
    console.error("Failed to save record", err)


    setRecords(prev => prev.filter(r => r.id !== newRecord.id))
  }


    // Reset form
    setTitle("")
    setDescription("")
    setCategory("personal")
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value as RecordItem["category"])}
      >
        <option value="personal">Personal</option>
        <option value="work">Work</option>
        <option value="other">Other</option>
      </select>
      <button type="submit">Save Offline</button>
    </form>
  )
}
