// NoteDetails.tsx
import React from 'react'

const NoteDetails = ({ note }: { note: any }) => {
  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  )
}

export default NoteDetails
