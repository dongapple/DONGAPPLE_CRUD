import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Sphere from './Sphere'
import Panel from './Panel'
import { useAuth } from './../contexts/Auth'
import { Note } from './../contexts/NoteTypes'
const ThreeScene: React.FC = () => {
  const { user } = useAuth() // AuthContext에서 user 가져오기
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row', // 가로 방향으로 정렬
        justifyContent: 'center', // 수평 가운데 정렬
        backgroundColor: 'black',
      }}
    >
      {user && (
        <div style={{ flex: 1 }}>
          {/* 로그인 상태에 따라 Sphere를 렌더링 */}

          <Canvas style={{ width: '100%', height: '100%' }}>
            <Sphere notes={notes} />
          </Canvas>
        </div>
      )}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* 로그인 상태에 따라 Panel을 렌더링 */}
        <Panel
          setNotes={setNotes}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
        />
      </div>
    </div>
  )
}

export default ThreeScene
