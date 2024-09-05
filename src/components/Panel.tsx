// src/Panel.tsx
import React, { useState } from 'react'
import {
  Input,
  Button,
  Stack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { collection, getDocs } from 'firebase/firestore'
import { db, auth } from '../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import * as yup from 'yup' // yup 불러오기

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .required('이메일은 필수 입력 항목입니다.')
    .email('유효한 이메일 주소를 입력해주세요.'),
  password: yup
    .string()
    .required('비밀번호는 필수 입력 항목입니다.')
    .min(6, '비밀번호는 6자 이상입니다.'),
})

const PasswordInput = () => {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <InputGroup size="md">
      <Input
        pr="4rem"
        type={show ? 'text' : 'password'}
        placeholder="비밀번호 입력"
      />
      <InputRightElement width="4.5rem">
        <Button h="1rem" size="sm" onClick={handleClick}>
          {show ? 'Hide' : 'Show'}
        </Button>
      </InputRightElement>
    </InputGroup>
  )
}

const Panel = ({
  setNotes,
}: {
  setNotes: React.Dispatch<React.SetStateAction<any[]>>
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string>('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      console.log('로그인 시도')
      await validationSchema.validate({ email, password })
      await signInWithEmailAndPassword(auth, email, password)
      // 로그인 후 메모 리스트 가져오기
      alert('로그인 성공')
      await fetchNotes()
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setError(error.message)
      } else {
        console.error('로그인 에러:', error)
        setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인하세요.')
      }
    }
  }

  const fetchNotes = async () => {
    try {
      const notesCollection = collection(db, 'notes')
      const snapshot = await getDocs(notesCollection)
      const notes = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setNotes(notes)
    } catch (error) {
      console.error('메모 가져오기 실패:', error)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div
        style={{
          margin: '20px',
          padding: '20px',
          color: 'white',
          border: 'solid',
          borderRadius: '16px',
        }}
      >
        <Stack spacing={8} width="300px" margin="auto">
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              width="100%"
              type="email"
              placeholder="이메일 입력"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <PasswordInput />
          </FormControl>
          <Button
            colorScheme="teal"
            size="sm"
            type="submit" // 폼 제출 버튼으로 설정
          >
            로그인
          </Button>
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </Stack>
      </div>
    </form>
  )
}

export default Panel
