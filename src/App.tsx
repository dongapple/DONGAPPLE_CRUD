import React from 'react'
import './App.css'
import ThreeScene from './components/ThreeScene'
import { AuthProvider } from './contexts/Auth' // 실제 경로를 확인하세요

function App() {
  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <AuthProvider>
        <ThreeScene />
      </AuthProvider>
    </div>
  )
}

export default App
