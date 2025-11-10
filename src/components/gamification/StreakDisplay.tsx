import { motion } from 'framer-motion'
import { Flame } from 'lucide-react'
import { getStreakEmoji } from '../../lib/utils'

interface StreakDisplayProps {
  streak: number
  size?: 'sm' | 'md' | 'lg'
}

export function StreakDisplay({ streak, size = 'md' }: StreakDisplayProps) {
  const sizes = {
    sm: { container: 'text-sm', icon: 'w-4 h-4', text: 'text-sm' },
    md: { container: 'text-base', icon: 'w-5 h-5', text: 'text-base' },
    lg: { container: 'text-lg', icon: 'w-6 h-6', text: 'text-xl' },
  }

  const { icon, text } = sizes[size]

  return (
    <motion.div
      className="flex items-center gap-2 bg-gradient-to-r from-orange-50 to-red-50 px-4 py-2 rounded-xl"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatDelay: 2,
        }}
      >
        <Flame className={`${icon} text-orange-500`} />
      </motion.div>
      <span className={`font-bold ${text} text-gray-900`}>
        {streak} {streak === 1 ? 'day' : 'days'}
      </span>
      <span className="text-lg">{getStreakEmoji(streak)}</span>
    </motion.div>
  )
}
