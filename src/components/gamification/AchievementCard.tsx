import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import type { Achievement } from '../../types'
import { Card } from '../ui/Card'
import { Progress } from '../ui/Progress'

interface AchievementCardProps {
  achievement: Achievement
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const isUnlocked = !!achievement.unlockedAt
  const hasProgress = achievement.progress !== undefined && achievement.maxProgress !== undefined

  return (
    <Card
      className={`relative overflow-hidden ${!isUnlocked && 'opacity-60'}`}
      hover={isUnlocked}
    >
      {!isUnlocked && (
        <div className="absolute top-2 right-2">
          <Lock className="w-5 h-5 text-gray-400" />
        </div>
      )}

      <div className="flex gap-4">
        <motion.div
          className="text-4xl"
          animate={isUnlocked ? { rotate: [0, 10, -10, 0] } : {}}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        >
          {achievement.icon}
        </motion.div>

        <div className="flex-1">
          <h3 className="font-bold text-lg">{achievement.title}</h3>
          <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>

          {hasProgress && !isUnlocked && (
            <div className="mt-3">
              <Progress
                value={achievement.progress!}
                max={achievement.maxProgress!}
                showLabel
              />
            </div>
          )}

          {isUnlocked && achievement.unlockedAt && (
            <p className="text-xs text-success-600 mt-2 font-semibold">
              Unlocked {new Date(achievement.unlockedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </div>
    </Card>
  )
}
