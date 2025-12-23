import { signOut } from 'firebase/auth'
import { auth } from '../lib/firebase.js'

export default function HomePage({ user }) {
  async function onLogout() {
    await signOut(auth)
  }

  return (
    <div className="home-shell">
      <div className="home-card">
        <h1 className="home-title">เข้าสู่ระบบแล้ว</h1>
        <div className="home-meta">
          <div className="home-row">
            <div className="home-label">Email</div>
            <div className="home-value">{user?.email || '-'}</div>
          </div>
          <div className="home-row">
            <div className="home-label">UID</div>
            <div className="home-value">{user?.uid || '-'}</div>
          </div>
        </div>

        <button className="home-logout" type="button" onClick={onLogout}>
          ออกจากระบบ
        </button>
      </div>
    </div>
  )
}
