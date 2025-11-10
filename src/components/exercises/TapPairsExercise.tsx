import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import type { TapPairsExercise as TapPairsType } from '../../types'
import { Card } from '../ui/Card'
import { playSuccessSound, cn } from '../../lib/utils'
import { Mascot } from '../Mascot'
import { quickConfetti } from '../../lib/confetti'

interface Props {
  exercise: TapPairsType
  onComplete: (isCorrect: boolean, answer: any) => void
}

export function TapPairsExercise({ exercise, onComplete }: Props) {
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null)
  const [selectedRight, setSelectedRight] = useState<number | null>(null)
  const [matchedPairs, setMatchedPairs] = useState<Set<number>>(new Set())
  const [wrongPairs, setWrongPairs] = useState<Set<string>>(new Set())

  const handleLeftClick = (index: number) => {
    if (matchedPairs.has(index)) return
    setSelectedLeft(index)
    if (selectedRight !== null) {
      checkMatch(index, selectedRight)
    }
  }

  const handleRightClick = (index: number) => {
    if (matchedPairs.has(index)) return
    setSelectedRight(index)
    if (selectedLeft !== null) {
      checkMatch(selectedLeft, index)
    }
  }

  const checkMatch = (leftIndex: number, rightIndex: number) => {
    if (leftIndex === rightIndex) {
      // Correct match!
      playSuccessSound()
      quickConfetti()
      setMatchedPairs(new Set([...matchedPairs, leftIndex]))
      setSelectedLeft(null)
      setSelectedRight(null)

      // Check if all pairs are matched
      if (matchedPairs.size + 1 === exercise.pairs.length) {
        setTimeout(() => {
          onComplete(true, Array.from(matchedPairs))
        }, 1000)
      }
    } else {
      // Wrong match
      const key = `${leftIndex}-${rightIndex}`
      setWrongPairs(new Set([...wrongPairs, key]))
      setTimeout(() => {
        setWrongPairs(new Set())
        setSelectedLeft(null)
        setSelectedRight(null)
      }, 500)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-4xl mx-auto"
    >
      {/* Mascot with instruction */}
      <div className="mb-8">
        <Mascot emotion="happy" size="md" animate />
        <p className="text-center mt-4 text-xl font-bold text-gray-800">
          Tap matching pairs!
        </p>
        <p className="text-center text-gray-600">
          {matchedPairs.size} / {exercise.pairs.length} matched
        </p>
      </div>

      <Card className="p-8">
        <div className="grid grid-cols-2 gap-6">
          {/* Left Column (Kyrgyz) */}
          <div className="space-y-3">
            {exercise.pairs.map((pair, index) => (
              <motion.button
                key={`left-${index}`}
                onClick={() => handleLeftClick(index)}
                disabled={matchedPairs.has(index)}
                whileHover={{ scale: matchedPairs.has(index) ? 1 : 1.02 }}
                whileTap={{ scale: matchedPairs.has(index) ? 1 : 0.98 }}
                className={cn(
                  'w-full px-6 py-4 rounded-xl font-bold text-lg transition-all duo-button relative',
                  matchedPairs.has(index)
                    ? 'bg-duo-green-500 text-white border-b-4 border-duo-green-700 opacity-50'
                    : selectedLeft === index
                    ? 'bg-duo-blue-500 text-white border-b-4 border-duo-blue-700'
                    : 'bg-white border-2 border-gray-300 hover:border-duo-blue-500'
                )}
              >
                {pair.left}
                {matchedPairs.has(index) && (
                  <Sparkles className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 text-duo-yellow-400" />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right Column (English) */}
          <div className="space-y-3">
            {exercise.pairs.map((pair, index) => (
              <motion.button
                key={`right-${index}`}
                onClick={() => handleRightClick(index)}
                disabled={matchedPairs.has(index)}
                whileHover={{ scale: matchedPairs.has(index) ? 1 : 1.02 }}
                whileTap={{ scale: matchedPairs.has(index) ? 1 : 0.98 }}
                className={cn(
                  'w-full px-6 py-4 rounded-xl font-bold text-lg transition-all duo-button relative',
                  matchedPairs.has(index)
                    ? 'bg-duo-green-500 text-white border-b-4 border-duo-green-700 opacity-50'
                    : selectedRight === index
                    ? 'bg-duo-blue-500 text-white border-b-4 border-duo-blue-700'
                    : 'bg-white border-2 border-gray-300 hover:border-duo-blue-500'
                )}
              >
                {pair.right}
                {matchedPairs.has(index) && (
                  <Sparkles className="absolute left-2 top-1/2 -translate-y-1/2 w-5 h-5 text-duo-yellow-400" />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(matchedPairs.size / exercise.pairs.length) * 100}%` }}
              className="bg-gradient-to-r from-duo-green-500 to-duo-green-600 h-4 rounded-full"
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
