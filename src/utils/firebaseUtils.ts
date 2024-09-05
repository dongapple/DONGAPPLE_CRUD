import { db } from './../firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { Note } from './../contexts/NoteTypes'

export const fetchNotesFromFirestore = async (
  userId: string
): Promise<Note[]> => {
  const notesCollection = collection(db, 'notes')
  const q = query(notesCollection, where('userId', '==', userId)) // 사용자 ID로 필터링
  const notesSnapshot = await getDocs(q)
  const notesList = notesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as unknown as Note[]

  return notesList
}
