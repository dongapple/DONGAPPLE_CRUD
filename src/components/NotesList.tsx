// NotesList.tsx
import React from 'react'
import { Note } from './../contexts/NoteTypes'

interface NotesListProps {
  notes: Note[]
  onNoteClick: (note: Note) => void
  onNewNoteClick: () => void
  onNoteDelete: (noteId: number) => void // 삭제 핸들러 추가
}

const NotesList: React.FC<NotesListProps> = ({
  notes,
  onNoteClick,
  onNewNoteClick,
  onNoteDelete, // 삭제 핸들러 추가
}) => {
  console.log(notes)
  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h2>메모 리스트</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {notes.map((note) => (
          <li
            key={note.id !== null ? note.id : Math.random()} // null일 경우 대체 키 사용
            style={{
              cursor: 'pointer',
              marginBottom: '10px',
              padding: '10px',
              border: '1px solid #444',
              borderRadius: '5px',
              display: 'flex',
              justifyContent: 'space-between', // 삭제 버튼을 오른쪽에 배치
              alignItems: 'center',
            }}
          >
            <span onClick={() => onNoteClick(note)}>{note.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation() // 클릭 이벤트가 부모로 전달되지 않도록
                onNoteDelete(note.id) // 삭제 핸들러 호출
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
