import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import { calculateLevel, xpForNextLevel } from '../../lib/utils'
import { Progress } from '../ui/Progress'

interface XpBarProps {
  currentXp: number
  showDetails?: boolean
}

export function XpBar({ currentXp, showDetails = true }: XpBarProps) {
  const currentLevel = calculateLevel(currentXp)
  const xpForCurrent = xpForNextLevel(currentLevel - 1)
  const xpForNext = xpForNextLevel(currentLevel)
  const progressXp = currentXp - xpForCurrent
  const requiredXp = xpForNext - xpForCurrent

  return (
    <div className="space-y-2">
      {showDetails && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Trophy className="w-5 h-5 text-warning-500" />
            </motion.div>
            <span className="font-bold text-lg">Level {currentLevel}</span>
          </div>
          <span className="text-sm text-gray-600">
            {progressXp} / {requiredXp} XP
          </span>
        </div>
      )}
      <Progress value={progressXp} max={requiredXp} variant="default" />
    </div>
  )
}
