import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, CheckCircle, XCircle } from 'lucide-react'
import type { ListeningExercise as ListeningType } from '../../types'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { cn } from '../../lib/utils'
import { ElevenLabsService } from '../../services/elevenLabsService'
import { playSuccessSound, playErrorSound } from '../../lib/utils'

interface Props {
  exercise: ListeningType
  onComplete: (isCorrect: boolean, answer: number) => void
}

export function ListeningExercise({ exercise, onComplete }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)
  const [playCount, setPlayCount] = useState(0)

  const handlePlayAudio = async () => {
    if (!isPlayingAudio) {
      setIsPlayingAudio(true)
      await ElevenLabsService.playAudio(exercise.audioUrl)
      setIsPlayingAudio(false)
      setPlayCount(prev => prev + 1)
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
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Listen and answer the question
          </h2>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePlayAudio}
            disabled={isPlayingAudio}
            className="mx-auto w-24 h-24 bg-gradient-to-br from-primary-500 to-purple-600 rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow disabled:opacity-50"
          >
            <Volume2 className={cn('w-12 h-12 text-white', isPlayingAudio && 'animate-pulse')} />
          </motion.button>

          <p className="text-sm text-gray-500 mt-4">
            {playCount === 0 ? 'Click to play audio' : `Played ${playCount} time${playCount > 1 ? 's' : ''}`}
          </p>
        </div>

        {playCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-lg font-semibold text-gray-900 mb-4">{exercise.question}</p>

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
              {isRevealed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 bg-blue-50 rounded-xl"
                >
                  <p className="text-sm text-gray-700 mb-2">
                    <strong>Transcript:</strong> {exercise.text}
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
          </motion.div>
        )}
      </Card>
    </motion.div>
  )
}
