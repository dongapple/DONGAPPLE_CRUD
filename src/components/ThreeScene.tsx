// ThreeScene.tsx
import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import Sphere from './Sphere'
import Panel from './Panel'
import { useAuth } from './../contexts/Auth'
import { Note } from './../contexts/NoteTypes'
import { saveNoteToFirestore } from './../utils/firestoreUtils'
import { fetchNotesFromFirestore } from '../utils/firebaseUtils'

const ThreeScene: React.FC = () => {
  const { user } = useAuth()
  const [notes, setNotes] = useState<Note[]>([])
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  useEffect(() => {
    const getNotes = async () => {
      try {
        const fetchedNotes = await fetchNotesFromFirestore()
        setNotes(fetchedNotes)
      } catch (error) {
        console.error('Failed to fetch notes:', error)
      }
    }

    if (user) {
      getNotes()
    }
  }, [user]) // 사용자 로그인 상태가 변경될 때마다 노트 데이터를 가져옴

  const handleSave = async (updatedNote: Note) => {
    try {
      await saveNoteToFirestore(updatedNote)
      const updatedNotes = await fetchNotesFromFirestore()
      setNotes(updatedNotes)
      setSelectedNote(null)
    } catch (error) {
      console.error('Failed to save note:', error)
    }
  }

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
      {user && (
        <div style={{ flex: 1 }}>
          <Canvas style={{ width: '100%', height: '100%' }}>
            <Sphere notes={notes} setSelectedNote={setSelectedNote} />
          </Canvas>
        </div>
      )}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Panel
          notes={notes}
          setNotes={setNotes}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
          onSave={handleSave}
        />
      </div>
    </div>
  )
}

export default ThreeScene
