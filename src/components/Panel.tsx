import React from 'react'
import NotesList from './NotesList'
import NoteDetails from './NoteDetails'
import { useAuth } from './../contexts/Auth'
import Login from './Login' // 로그인 폼 컴포넌트를 불러오기

const Panel = ({
  setNotes,
  selectedNote,
  setSelectedNote,
}: {
  setNotes: (notes: any[]) => void
  selectedNote: any
  setSelectedNote: (note: any) => void
}) => {
  const { user, signOut } = useAuth() // 로그인 상태와 로그아웃 함수 가져오기

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
          {/* 로그아웃 버튼 */}
          <button onClick={handleLogout} style={{ marginBottom: '20px' }}>
            로그아웃
          </button>

          {/* 선택된 노트가 있는지 여부에 따라 다른 컴포넌트 렌더링 */}
          {selectedNote ? (
            <NoteDetails note={selectedNote} />
          ) : (
            <NotesList
              notes={[]}
              onNoteClick={setSelectedNote}
              onNewNoteClick={() =>
                setSelectedNote({ id: null, title: '', content: '' })
              }
            />
          )}
        </>
      ) : (
        // 로그인되지 않은 경우 로그인 폼을 렌더링
        <Login setNotes={setNotes} />
      )}
    </div>
  )
}

export default Panel
