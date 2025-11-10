import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'
import { SignupPage } from './pages/SignupPage'
import { LearnPage } from './pages/LearnPage'
import { LessonPage } from './pages/LessonPage'
import { useAuthStore } from './store/authStore'
import { useProgressStore } from './store/progressStore'

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />
}

// Public Route Component (redirects to home if already authenticated)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" />
}

function App() {
  const { setUser, setLoading } = useAuthStore()
  const { setProgress } = useProgressStore()

  useEffect(() => {
    // Initialize with mock data for demo
    // In production, this would check Supabase session
    const initAuth = async () => {
      setLoading(true)

      // Mock: Check if user exists in localStorage (for demo persistence)
      const savedUser = localStorage.getItem('demo_user')
      const savedProgress = localStorage.getItem('demo_progress')

      if (savedUser && savedProgress) {
        setUser(JSON.parse(savedUser))
        setProgress(JSON.parse(savedProgress))
      }

      setLoading(false)
    }

    initAuth()
  }, [setUser, setProgress, setLoading])

  // Save to localStorage when auth changes (for demo)
  const { user } = useAuthStore()
  const { progress } = useProgressStore()

  useEffect(() => {
    if (user) {
      localStorage.setItem('demo_user', JSON.stringify(user))
    } else {
      localStorage.removeItem('demo_user')
    }
  }, [user])

  useEffect(() => {
    if (progress) {
      localStorage.setItem('demo_progress', JSON.stringify(progress))
    } else {
      localStorage.removeItem('demo_progress')
    }
  }, [progress])

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <HomePage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/learn"
          element={
            <ProtectedRoute>
              <Layout>
                <LearnPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/lesson/:lessonId"
          element={
            <ProtectedRoute>
              <Layout>
                <LessonPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
