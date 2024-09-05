// Panel.tsx
import React from 'react'
import NotesList from './NotesList'
import NoteDetails from './NoteDetails'
import Login from './Login'
import { useAuth } from './../contexts/Auth'
import { Note } from './../contexts/NoteTypes'

interface PanelProps {
  notes: Note[]
  setNotes: (notes: Note[]) => void
  selectedNote: Note | null
  setSelectedNote: (note: Note | null) => void
  onSave: (updatedNote: Note) => void
}

const Panel: React.FC<PanelProps> = ({
  notes,
  setNotes,
  selectedNote,
  setSelectedNote,
  onSave,
}) => {
  const { user, signOut } = useAuth()

  const handleLogout = async () => {
    try {
      await signOut()
      console.log('로그아웃 성공')
    } catch (error) {
      console.error('로그아웃 실패:', error)
    }
  }

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      {user ? (
        <>
          <h2>메모 패널</h2>
          <button onClick={handleLogout} style={{ marginBottom: '20px' }}>
            로그아웃
          </button>

          {selectedNote ? (
            <NoteDetails note={selectedNote} onSave={onSave} />
          ) : (
            <NotesList
              notes={notes}
              onNoteClick={setSelectedNote}
              onNewNoteClick={() =>
                setSelectedNote({ id: null, title: '', content: '' })
              }
            />
          )}
        </>
      ) : (
        <Login setNotes={setNotes} />
      )}
    </div>
  )
}

export default Panel
