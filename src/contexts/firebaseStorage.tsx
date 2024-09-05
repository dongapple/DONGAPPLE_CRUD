// firebaseStorage.ts
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'

// Firebase Storage 초기화
const storage = getStorage()

interface Note {
  title: string
  content: string
  createdAt: string
}

// JSON 파일 업로드 함수
export const uploadJsonFile = async (
  note: Note,
  fileName: string
): Promise<void> => {
  const storageRef = ref(storage, `notes/${fileName}.json`)
  const jsonFile = new Blob([JSON.stringify(note)], {
    type: 'application/json',
  })

  try {
    await uploadBytes(storageRef, jsonFile)
    console.log('JSON 파일 업로드 성공')
  } catch (error) {
    console.error('업로드 실패:', error)
  }
}

// JSON 파일 다운로드 함수
export const downloadJsonFile = async (
  fileName: string
): Promise<Note | null> => {
  const storageRef = ref(storage, `notes/${fileName}.json`)

  try {
    const url = await getDownloadURL(storageRef)
    const response = await fetch(url)
    const data: Note = await response.json()
    return data
  } catch (error) {
    console.error('다운로드 실패:', error)
    return null
  }
}
