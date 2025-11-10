import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface MascotProps {
  emotion?: 'happy' | 'excited' | 'sad' | 'thinking' | 'celebrating'
  size?: 'sm' | 'md' | 'lg'
  animate?: boolean
}

export function Mascot({ emotion = 'happy', size = 'md', animate = true }: MascotProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  }

  const emotions = useMemo(() => ({
    happy: {
      eyes: '😊',
      color: 'from-duo-green-400 to-duo-green-600',
      bounce: true,
    },
    excited: {
      eyes: '🤩',
      color: 'from-duo-yellow-400 to-duo-yellow-600',
      bounce: true,
    },
    sad: {
      eyes: '😢',
      color: 'from-duo-blue-300 to-duo-blue-500',
      bounce: false,
    },
    thinking: {
      eyes: '🤔',
      color: 'from-duo-purple-400 to-duo-purple-600',
      bounce: false,
    },
    celebrating: {
      eyes: '🎉',
      color: 'from-duo-pink-400 to-duo-pink-600',
      bounce: true,
    },
  }), [])

  const currentEmotion = emotions[emotion]

  return (
    <motion.div
      className="relative flex items-center justify-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        y: animate && currentEmotion.bounce ? [0, -10, 0] : 0,
      }}
      transition={{
        scale: { duration: 0.3 },
        y: {
          duration: 1.5,
          repeat: animate && currentEmotion.bounce ? Infinity : 0,
          ease: 'easeInOut',
        },
      }}
    >
      {/* Main character body */}
      <div className={`${sizeClasses[size]} relative`}>
        {/* Glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${currentEmotion.color} rounded-full blur-xl opacity-40 animate-pulse-slow`} />

        {/* Body */}
        <div className={`absolute inset-0 bg-gradient-to-br ${currentEmotion.color} rounded-full shadow-xl`}>
          {/* Face */}
          <div className="absolute inset-0 flex items-center justify-center text-4xl">
            {currentEmotion.eyes}
          </div>

          {/* Highlight */}
          <div className="absolute top-2 left-2 w-4 h-4 bg-white rounded-full opacity-60" />
        </div>

        {/* Sparkles */}
        {emotion === 'celebrating' && (
          <>
            <motion.div
              className="absolute -top-2 -right-2 text-yellow-400 text-2xl"
              animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.div>
            <motion.div
              className="absolute -bottom-2 -left-2 text-yellow-400 text-xl"
              animate={{ rotate: [0, -360], scale: [1, 1.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              ⭐
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  )
}

// Mascot speech bubble
interface MascotSpeechProps {
  message: string
  mascotEmotion?: 'happy' | 'excited' | 'sad' | 'thinking' | 'celebrating'
}

export function MascotSpeech({ message, mascotEmotion = 'happy' }: MascotSpeechProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-card"
    >
      <Mascot emotion={mascotEmotion} size="md" />
      <div className="flex-1">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-700 font-semibold"
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  )
}
