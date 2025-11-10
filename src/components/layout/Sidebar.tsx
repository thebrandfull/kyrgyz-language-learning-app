import { NavLink } from 'react-router-dom'
import { Home, BookOpen, MessageCircle, Trophy, Users, BarChart } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

const navigation = [
  { name: 'Home', to: '/', icon: Home },
  { name: 'Learn', to: '/learn', icon: BookOpen },
  { name: 'Practice', to: '/practice', icon: MessageCircle },
  { name: 'Achievements', to: '/achievements', icon: Trophy },
  { name: 'Leaderboard', to: '/leaderboard', icon: Users },
  { name: 'Progress', to: '/progress', icon: BarChart },
]

export function Sidebar() {
  return (
    <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-4rem)]">
      <nav className="p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200',
                'hover:bg-gray-50',
                isActive
                  ? 'bg-gradient-to-r from-primary-50 to-purple-50 text-primary-600 font-semibold'
                  : 'text-gray-600'
              )
            }
          >
            {({ isActive }) => (
              <>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className={cn('w-5 h-5', isActive && 'text-primary-600')} />
                </motion.div>
                <span>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
