import { type RecordItem } from "../types/record";
import { useState } from "react";
import { updateRecord, markRecordAsDeleted } from "../storage/recordDB";

export function EditableRecord({
  record,
  onDelete,
  onUpdate,
}: {
  record: RecordItem;
   onDelete: (id: string) => void;
  onUpdate: (record: RecordItem) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(record.title);
  const [description, setDescription] = useState(record.description);
  const [category, setCategory] = useState(record.category);

  async function handleSave() {
    const updated: RecordItem = {
      ...record,
      title,
      description,
      category,
      synced: false,
      updatedAt: Date.now(),
    };

    // 1️⃣ Update UI
    onUpdate(updated);

    // 2️⃣ Persist offline
    await updateRecord(updated);

    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <li className="border rounded-lg p-4 space-y-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value as RecordItem["category"])
          }
          className="border p-2 rounded"
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="other">Other</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-3 py-1 rounded"
          >
            Save
          </button>
          <button onClick={() => setIsEditing(false)} className="text-gray-500">
            Cancel
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="border rounded-lg p-4 flex justify-between items-start">
      <div>
        <h3 className="font-semibold">{record.title}</h3>
        <p className="text-sm text-gray-600">{record.description}</p>
        <span className="text-xs capitalize">{record.category}</span>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span
          className={`text-xs ${
            record.synced ? "text-green-600" : "text-yellow-600"
          }`}
        >
          {record.synced ? "Synced" : "Pending"}
        </span>

        <button
          onClick={() => setIsEditing(true)}
          className="text-blue-600 text-sm"
        >
          Edit
        </button>

        <button
          onClick={async () => {
            onDelete(record.id);
            await markRecordAsDeleted(record.id);
          }}
          className="text-red-600 text-sm"
        >
          Delete
        </button>
      </div>
    </li>
  );
}
