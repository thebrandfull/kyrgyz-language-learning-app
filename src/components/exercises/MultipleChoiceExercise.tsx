import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, CheckCircle, XCircle } from 'lucide-react'
import type { MultipleChoiceExercise as MultipleChoiceType } from '../../types'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'
import { ElevenLabsService } from '../../services/elevenLabsService'
import { playSuccessSound, playErrorSound } from '../../lib/utils'

interface Props {
  exercise: MultipleChoiceType
  onComplete: (isCorrect: boolean, answer: number) => void
}

export function MultipleChoiceExercise({ exercise, onComplete }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  const handlePlayAudio = async () => {
    if (exercise.questionAudio && !isPlayingAudio) {
      setIsPlayingAudio(true)
      await ElevenLabsService.playAudio(exercise.questionAudio)
      setIsPlayingAudio(false)
    }
  }

  const handleSubmit = () => {
    if (selectedAnswer === null) return

    setIsRevealed(true)
    const isCorrect = selectedAnswer === exercise.correctAnswer

    if (isCorrect) {
      playSuccessSound()
    } else {
      playErrorSound()
    }

    setTimeout(() => {
      onComplete(isCorrect, selectedAnswer)
    }, 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="p-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{exercise.question}</h2>
            {exercise.questionAudio && (
              <button
                onClick={handlePlayAudio}
                disabled={isPlayingAudio}
                className="p-3 bg-primary-100 hover:bg-primary-200 rounded-full transition-colors disabled:opacity-50"
              >
                <Volume2 className={cn('w-6 h-6 text-primary-600', isPlayingAudio && 'animate-pulse')} />
              </button>
            )}
          </div>
        </div>

        <div className="space-y-3 mb-8">
          {exercise.options.map((option, index) => {
            const isSelected = selectedAnswer === index
            const isCorrect = index === exercise.correctAnswer
            const showResult = isRevealed

            return (
              <motion.button
                key={index}
                whileHover={!isRevealed ? { scale: 1.02 } : {}}
                whileTap={!isRevealed ? { scale: 0.98 } : {}}
                onClick={() => !isRevealed && setSelectedAnswer(index)}
                disabled={isRevealed}
                className={cn(
                  'w-full p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-center justify-between',
                  !showResult && !isSelected && 'border-gray-200 hover:border-primary-300 bg-white',
                  !showResult && isSelected && 'border-primary-500 bg-primary-50',
                  showResult && isCorrect && 'border-success-500 bg-success-50',
                  showResult && !isCorrect && isSelected && 'border-danger-500 bg-danger-50',
                  showResult && !isCorrect && !isSelected && 'border-gray-200 bg-gray-50 opacity-50'
                )}
              >
                <span className="font-medium">{option}</span>
                {showResult && isCorrect && (
                  <CheckCircle className="w-6 h-6 text-success-600" />
                )}
                {showResult && !isCorrect && isSelected && (
                  <XCircle className="w-6 h-6 text-danger-600" />
                )}
              </motion.button>
            )
          })}
        </div>

        <AnimatePresence>
          {isRevealed && exercise.explanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-blue-50 rounded-xl"
            >
              <p className="text-sm text-gray-700">
                <strong>Explanation:</strong> {exercise.explanation}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {!isRevealed && (
          <Button
            onClick={handleSubmit}
            disabled={selectedAnswer === null}
            className="w-full"
            size="lg"
          >
            Check Answer
          </Button>
        )}
      </Card>
    </motion.div>
  )
}
