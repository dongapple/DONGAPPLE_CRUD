import React from 'react'
import { Note } from './../contexts/NoteTypes'

interface NotesListProps {
  notes: Note[]
  onNoteClick: (note: Note) => void
  onNewNoteClick: () => void
  onNoteDelete: (noteId: string) => void // string 타입으로 변경
}

const NotesList: React.FC<NotesListProps> = ({
  notes,
  onNoteClick,
  onNewNoteClick,
  onNoteDelete,
}) => {
  console.log(notes)
  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h2>메모 리스트</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {notes.map((note) => (
          <li
            key={note.id || Math.random().toString()} // null 체크 및 문자열로 변환
            style={{
              cursor: 'pointer',
              marginBottom: '10px',
              padding: '10px',
              border: '1px solid #444',
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span onClick={() => onNoteClick(note)}>{note.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (note.id) {
                  onNoteDelete(note.id.toString()) // 문자열로 변환하여 전달
                } else {
                  console.error('Note ID is undefined')
                }
              }}
              style={{
                padding: '5px 10px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              삭제
            </button>
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
