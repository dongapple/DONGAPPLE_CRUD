// NotesList.tsx
import React from 'react'

const NotesList = ({
  notes,
  onNoteClick,
}: {
  notes: any[]
  onNoteClick: (note: any) => void
}) => {
  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h2>메모 리스트</h2>
      <ul>
        {notes.map((note) => (
          <li
            key={note.id}
            onClick={() => onNoteClick(note)}
            style={{ cursor: 'pointer' }}
          >
            {note.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default NotesList
