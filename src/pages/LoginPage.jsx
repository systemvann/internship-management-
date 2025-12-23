import { useMemo, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth'
import { auth } from '../lib/firebase.js'

function friendlyAuthError(error) {
  const code = error?.code || ''

  if (code === 'auth/invalid-email') return 'อีเมลไม่ถูกต้อง'
  if (code === 'auth/missing-password') return 'กรุณากรอกรหัสผ่าน'
  if (code === 'auth/invalid-credential') return 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
  if (code === 'auth/user-disabled') return 'บัญชีถูกปิดใช้งาน'
  if (code === 'auth/popup-closed-by-user') return 'ปิดหน้าต่างล็อกอินก่อนเสร็จ'
  if (code === 'auth/account-exists-with-different-credential') return 'อีเมลนี้ผูกกับวิธีล็อกอินอื่นอยู่แล้ว'

  return error?.message || 'เกิดข้อผิดพลาด'
}

export default function LoginPage() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const title = useMemo(() => (mode === 'login' ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'), [mode])

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
      }
    } catch (err) {
      setError(friendlyAuthError(err))
    } finally {
      setLoading(false)
    }
  }

  async function onGoogle() {
    setError('')
    setLoading(true)

    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (err) {
      setError(friendlyAuthError(err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">{title}</h1>
          <p className="auth-subtitle">InternshipPlus</p>
        </div>

        <form className="auth-form" onSubmit={onSubmit}>
          <label className="auth-label">
            อีเมล
            <input
              className="auth-input"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </label>

          <label className="auth-label">
            รหัสผ่าน
            <input
              className="auth-input"
              type="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="อย่างน้อย 6 ตัวอักษร"
              required
            />
          </label>

          {error ? <div className="auth-error">{error}</div> : null}

          <button className="auth-primary" type="submit" disabled={loading}>
            {loading ? 'กำลังดำเนินการ...' : title}
          </button>

          <button className="auth-secondary" type="button" onClick={onGoogle} disabled={loading}>
            ดำเนินการต่อด้วย Google
          </button>

          <div className="auth-footer">
            {mode === 'login' ? (
              <button className="auth-link" type="button" onClick={() => setMode('signup')} disabled={loading}>
                ยังไม่มีบัญชี? สมัครสมาชิก
              </button>
            ) : (
              <button className="auth-link" type="button" onClick={() => setMode('login')} disabled={loading}>
                มีบัญชีแล้ว? เข้าสู่ระบบ
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}
