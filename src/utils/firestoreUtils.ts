import { db } from './../firebaseConfig' // Firebase 설정 파일에서 가져오기
import { doc, setDoc } from 'firebase/firestore'
import { Note } from './../contexts/NoteTypes'

export const saveNoteToFirestore = async (note: Note) => {
  if (!note.id) {
    throw new Error('Note ID is missing')
  }

  const noteRef = doc(db, 'notes', note.id.toString())
  await setDoc(noteRef, note)
}
