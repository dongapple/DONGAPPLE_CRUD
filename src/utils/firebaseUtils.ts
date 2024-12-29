import { db } from './../firebaseConfig'
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from 'firebase/firestore'
import { Note } from './../contexts/NoteTypes'

export const fetchNotesFromFirestore = async (
  userId: string
): Promise<Note[]> => {
  const notesCollection = collection(db, 'notes')
  const q = query(notesCollection, where('userId', '==', userId))
  const notesSnapshot = await getDocs(q)
  const notesList = notesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as unknown as Note[]

  return notesList
}

export const deleteNoteFromFirestore = async (
  noteId: string,
  userId: string
): Promise<void> => {
  try {
    if (typeof noteId !== 'string' || noteId.trim() === '') {
      throw new Error('유효하지 않은 noteId입니다.')
    }
    if (typeof userId !== 'string' || userId.trim() === '') {
      throw new Error('유효하지 않은 userId입니다.')
    }
    const noteRef = doc(db, 'notes', noteId)
    await deleteDoc(noteRef)
  } catch (error) {
    console.error('노트 삭제 실패:', error)
    throw error
  }
}
