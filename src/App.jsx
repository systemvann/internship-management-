import './App.css'
import { AuthProvider, useAuth } from './auth/AuthProvider.jsx'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'

function AppContent() {
  const { user, loading, initError } = useAuth()

  if (initError) {
    return (
      <div className="app-loading">
        <div className="app-loading-card">
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Firebase ตั้งค่าไม่ครบ</div>
          <div style={{ opacity: 0.85, marginBottom: 12 }}>{initError.message}</div>
          <div style={{ opacity: 0.85 }}>
            เช็คว่า:
            <div>1) มีไฟล์ <code>.env</code> ที่ root (ระดับเดียวกับ <code>package.json</code>)</div>
            <div>2) ใส่ค่า <code>VITE_FIREBASE_*</code> ครบ</div>
            <div>3) restart <code>npm run dev</code> หลังแก้ .env</div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="app-loading">
        <div className="app-loading-card">กำลังโหลด...</div>
      </div>
    )
  }

  if (!user) return <LoginPage />

  return <HomePage user={user} />
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
