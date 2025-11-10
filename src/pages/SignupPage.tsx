import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Mail, Lock, User } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useAuthStore } from '../store/authStore'
import { useProgressStore } from '../store/progressStore'

export function SignupPage() {
  const navigate = useNavigate()
  const { setUser } = useAuthStore()
  const { setProgress } = useProgressStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Mock authentication - replace with real Supabase auth
    setTimeout(() => {
      if (email && password && name) {
        const userId = Math.random().toString(36).substr(2, 9)
        setUser({
          id: userId,
          email,
          username: name.toLowerCase().replace(/\s/g, ''),
          displayName: name,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })
        setProgress({
          userId,
          totalXp: 0,
          currentStreak: 0,
          longestStreak: 0,
          lastActiveDate: new Date().toISOString(),
          level: 1,
          lessonsCompleted: 0,
          perfectLessons: 0,
          achievements: [],
          gems: 100,
          lingots: 0,
          hearts: 5,
          streakFreezes: 0,
          currentLeague: 'bronze',
          leagueRank: 0,
        })
        navigate('/')
      } else {
        setError('Please fill in all fields')
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            whileHover={{ rotate: 10 }}
            className="inline-block bg-gradient-to-br from-primary-500 to-purple-600 p-4 rounded-2xl mb-4"
          >
            <BookOpen className="w-12 h-12 text-white" />
          </motion.div>
          <h1 className="text-4xl font-display font-bold text-gradient mb-2">
            Start Learning Today!
          </h1>
          <p className="text-gray-600">Create your account to begin your Kyrgyz journey</p>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 bg-danger-50 border border-danger-200 rounded-lg text-danger-700 text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-100 outline-none transition-all"
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">At least 6 characters</p>
            </div>

            <Button type="submit" isLoading={isLoading} className="w-full" size="lg">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-primary-600 font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
