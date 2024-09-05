import React, { useState, useEffect } from 'react'
import { Note } from './../contexts/NoteTypes'

interface NoteDetailsProps {
  note: Note | null
  onSave: (updatedNote: Note) => void
}

const NoteDetails: React.FC<NoteDetailsProps> = ({ note, onSave }) => {
  const [title, setTitle] = useState(note?.title || '')
  const [content, setContent] = useState(note?.content || '')

  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
    }
  }, [note])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (note) {
      const updatedNote = {
        ...note,
        title,
        content,
        createdAt: note.createdAt,
      }

      onSave(updatedNote)
    }
  }

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h2>Note Details</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: '100%', height: '150px', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>
          Save
        </button>
      </form>
    </div>
  )
}

export default NoteDetails
