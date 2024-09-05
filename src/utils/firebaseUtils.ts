import { db } from './../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { Note } from './../contexts/NoteTypes'

export const fetchNotesFromFirestore = async (): Promise<Note[]> => {
  const notesCollection = collection(db, 'notes')
  const notesSnapshot = await getDocs(notesCollection)
  const notesList = notesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as unknown as Note[]

  return notesList
}
