import React from 'react'
import NotesList from './NotesList'
import NoteDetails from './NoteDetails'
import Login from './Login'
import { useAuth } from './../contexts/Auth'

interface PanelProps {
  setNotes: (notes: any[]) => void
  selectedNote: any
  setSelectedNote: (note: any) => void
  onSave: (updatedNote: any) => void
}

const Panel: React.FC<PanelProps> = ({
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
              notes={[]} // 노트 목록을 상위 컴포넌트에서 전달 받아야 합니다.
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
