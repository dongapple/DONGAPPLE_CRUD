import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import * as yup from 'yup' // yup 불러오기
// import './Login.css' // CSS 파일 불러오기

// 유효성 검사 스키마 생성
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

// Component
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      await validationSchema.validate({ email, password })
      await signInWithEmailAndPassword(auth, email, password)
      alert('로그인 성공')
      // 로그인 성공 후 동작을 여기에 추가
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        setError(validationError.message)
      } else {
        setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.')
      }
    }
  }

  return (
    <div className="login-container">
      <h1>로그인</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="input-wrapper">
          <label htmlFor="email">이메일</label>
          <input
            type="email"
            id="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력해주세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">로그인</button>

        {error && <p className="error-message">{error}</p>}
      </form>

      <p>
        비밀번호를 잊으셨나요? <a href="/forgot_password">비밀번호 재설정</a>
      </p>
      <p>
        회원가입은 <a href="/signup">여기</a>에서 하세요.
      </p>
    </div>
  )
}

export default Login
