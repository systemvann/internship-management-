import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

const missingEnvKeys = []
if (!firebaseConfig.apiKey) missingEnvKeys.push('VITE_FIREBASE_API_KEY')
if (!firebaseConfig.authDomain) missingEnvKeys.push('VITE_FIREBASE_AUTH_DOMAIN')
if (!firebaseConfig.projectId) missingEnvKeys.push('VITE_FIREBASE_PROJECT_ID')
if (!firebaseConfig.appId) missingEnvKeys.push('VITE_FIREBASE_APP_ID')

export let firebaseInitError = null
export let firebaseApp = null
export let auth = null
export let db = null
export let storage = null

if (missingEnvKeys.length > 0) {
  firebaseInitError = new Error(
    `Missing Firebase env vars: ${missingEnvKeys.join(', ')}. Create a .env file at the project root and restart the dev server.`,
  )
} else {
  firebaseApp = initializeApp(firebaseConfig)
  auth = getAuth(firebaseApp)
  db = getFirestore(firebaseApp)
  storage = getStorage(firebaseApp)
}

export async function getFirebaseAnalytics() {
  if (!firebaseApp || !firebaseConfig.measurementId) return null

  try {
    const supported = await isSupported()
    if (!supported) return null
    return getAnalytics(firebaseApp)
  } catch {
    return null
  }
}
