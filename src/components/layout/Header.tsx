import { Link } from 'react-router-dom'
import { User, Settings, LogOut, Flame, Heart, Gem } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAuthStore } from '../../store/authStore'
import { useProgressStore } from '../../store/progressStore'
import { useCurrencyStore } from '../../store/currencyStore'
import { cn } from '../../lib/utils'

export function Header() {
  const { user, logout } = useAuthStore()
  const { progress } = useProgressStore()
  const { gems, hearts, maxHearts } = useCurrencyStore()

  return (
    <header className="sticky top-0 z-30 bg-white border-b-4 border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-duo-green-500 to-duo-green-600 p-3 rounded-2xl shadow-button"
            >
              <span className="text-3xl">🇰🇬</span>
            </motion.div>
            <span className="text-2xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-duo-green-600 to-duo-blue-600">
              Kyrgyz Learn
            </span>
          </Link>

          {/* Currency & Stats */}
          {user && progress && (
            <div className="flex items-center gap-4">
              {/* Streak */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-red-100 rounded-xl border-2 border-orange-300"
              >
                <Flame className="w-5 h-5 text-orange-600" />
                <span className="font-bold text-orange-900">{progress.currentStreak}</span>
              </motion.div>

              {/* Gems */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl border-2 border-blue-300"
              >
                <Gem className="w-5 h-5 text-blue-600" />
                <span className="font-bold text-blue-900">{gems}</span>
              </motion.div>

              {/* Hearts */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-100 to-pink-100 rounded-xl border-2 border-red-300"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: maxHearts }).map((_, i) => (
                    <Heart
                      key={i}
                      className={cn(
                        'w-4 h-4 transition-all',
                        i < hearts
                          ? 'fill-red-500 text-red-500'
                          : 'fill-gray-300 text-gray-300'
                      )}
                    />
                  ))}
                </div>
                <span className="font-bold text-red-900">{hearts}</span>
              </motion.div>

              {/* Profile */}
              <div className="flex items-center gap-2 ml-2">
                <Link
                  to="/profile"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-duo-green-400 to-duo-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt={user.displayName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-6 h-6 text-white" />
                    )}
                  </div>
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
