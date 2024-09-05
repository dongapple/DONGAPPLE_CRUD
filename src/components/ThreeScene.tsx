import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Sphere from './Sphere'
import Panel from './Panel'
import { useAuth } from './../contexts/Auth'

const ThreeScene = () => {
  const { user } = useAuth() // AuthContext에서 user 가져오기
  const [notes, setNotes] = useState<any[]>([])
  const [selectedNote, setSelectedNote] = useState<any>(null)

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'black',
      }}
    >
      <div style={{ flex: 1 }}>
        {user && (
          <Canvas style={{ width: '100%', height: '100%' }}>
            <Sphere notes={notes} />
          </Canvas>
        )}
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
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
