import { db } from './../firebaseConfig'
import { doc, setDoc } from 'firebase/firestore'
import { Note } from './../contexts/NoteTypes'

export const saveNoteToFirestore = async (note: Note, userId: string) => {
  if (!note.id) {
    throw new Error('Note ID is missing')
  }

  const noteRef = doc(db, 'notes', note.id.toString())
  await setDoc(noteRef, { ...note, userId }) // 노트와 함께 사용자 ID 저장
}
