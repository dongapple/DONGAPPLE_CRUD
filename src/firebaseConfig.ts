import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

import { getStorage } from 'firebase/storage'
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  getDocs,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA3pSYQZvjqRVqqSkwo5tPumYxtnRB-NG8',
  authDomain: 'crud2-7c574.firebaseapp.com',
  projectId: 'crud2-7c574',
  storageBucket: 'crud2-7c574.appspot.com',
  messagingSenderId: '876739218204',
  appId: '1:876739218204:web:9211754de5ced10a6608d9',
  measurementId: 'G-NTF2HXHDY0',
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, collection, doc, setDoc, addDoc, getDocs, storage }
