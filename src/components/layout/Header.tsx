import { Link } from 'react-router-dom'
import { User, Settings, LogOut, BookOpen } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'
import { useProgressStore } from '../../store/progressStore'
import { XpBar } from '../gamification/XpBar'
import { StreakDisplay } from '../gamification/StreakDisplay'

export function Header() {
  const { user, logout } = useAuthStore()
  const { progress } = useProgressStore()

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 10 }}
              className="bg-gradient-to-br from-primary-500 to-purple-600 p-2 rounded-xl"
            >
              <BookOpen className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xl font-display font-bold text-gradient">
              Kyrgyz Learn
            </span>
          </Link>

          {/* User Info & Actions */}
          {user && progress && (
            <div className="flex items-center gap-4">
              {/* Streak */}
              <StreakDisplay streak={progress.currentStreak} size="sm" />

              {/* XP Bar */}
              <div className="hidden md:block w-48">
                <XpBar currentXp={progress.totalXp} showDetails={false} />
              </div>

              {/* Profile Dropdown */}
              <div className="flex items-center gap-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-purple-500 rounded-full flex items-center justify-center">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.displayName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <span className="hidden md:block font-semibold text-gray-700">
                    {user.displayName}
                  </span>
                </Link>

                <Link
                  to="/settings"
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Settings className="w-5 h-5 text-gray-600" />
                </Link>

                <button
                  onClick={logout}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <LogOut className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
