import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './features/auth/ui/LoginPage'
import RegisterPage from './features/auth/ui/RegisterPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  )
}

export default App
