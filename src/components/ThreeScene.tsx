// ThreeScene.tsx
import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Sphere from './Sphere'
import Panel from './Panel'
import NotesList from './NotesList'
import NoteDetails from './NoteDetails'

const ThreeScene = () => {
  const [notes, setNotes] = useState<any[]>([])
  const [selectedNote, setSelectedNote] = useState<any>(null)

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row', // 가로 방향으로 정렬
        justifyContent: 'center', // 수평 가운데 정렬
        // alignItems: 'center', // 수직 가운데 정렬
        backgroundColor: 'black',
      }}
    >
      <div style={{ flex: 1 }}>
        <Canvas style={{ width: '100%', height: '100%' }}>
          <Sphere />
        </Canvas>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Panel setNotes={setNotes} />
        {/* {selectedNote ? (
          <NoteDetails note={selectedNote} />
        ) : (
          <NotesList notes={notes} onNoteClick={setSelectedNote} />
        )} */}
      </div>
    </div>
  )
}

export default ThreeScene
