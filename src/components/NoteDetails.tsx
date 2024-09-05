import React, { useState } from 'react'

const NoteDetails = ({
  note,
  onSave,
}: {
  note: any
  onSave: (updatedNote: any) => void
}) => {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 수정된 데이터를 저장하는 로직 실행
    const updatedNote = {
      ...note,
      title,
      content,
    }

    onSave(updatedNote) // 상위 컴포넌트에 저장 요청 전달
  }

  return (
    <div style={{ padding: '20px', color: 'white' }}>
      <h2>노트 수정</h2>
      {/* 폼 태그로 감싸서 submit 이벤트 처리 */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ width: '100%', height: '150px', padding: '8px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>
          저장
        </button>
      </form>
    </div>
  )
}

export default NoteDetails
