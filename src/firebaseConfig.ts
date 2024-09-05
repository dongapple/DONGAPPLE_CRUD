import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyAXmDiTs4Z-aWm77boiFz1S31jolCZwsqQ',
  authDomain: 'crud-80e74.firebaseapp.com',
  projectId: 'crud-80e74',
  storageBucket: 'crud-80e74.appspot.com',
  messagingSenderId: '482931882956',
  appId: '1:482931882956:web:355cd6c4237a5a49823b69',
  measurementId: 'G-N45273CSCS',
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { app, auth, db, storage }
