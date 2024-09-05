import React from 'react'

interface Note {
  id: number
  title: string
}

interface NotesListProps {
  notes: Note[]
  onNoteClick: (note: Note) => void
  onNewNoteClick: () => void
}

const NotesList: React.FC<NotesListProps> = ({
  notes,
  onNoteClick,
  onNewNoteClick,
}) => {
  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h2>메모 리스트</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {notes.map((note) => (
          <li
            key={note.id}
            onClick={() => onNoteClick(note)}
            style={{
              cursor: 'pointer',
              marginBottom: '10px',
              padding: '10px',
              border: '1px solid #444',
              borderRadius: '5px',
            }}
          >
            {note.title}
          </li>
        ))}
      </ul>
      <button
        onClick={onNewNoteClick}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
        }}
      >
        새로 만들기
      </button>
    </div>
  )
}

export default NotesList
