import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, CheckCircle, XCircle } from 'lucide-react'
import type { TranslationExercise as TranslationType } from '../../types'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { ElevenLabsService } from '../../services/elevenLabsService'
import { playSuccessSound, playErrorSound } from '../../lib/utils'

interface Props {
  exercise: TranslationType
  onComplete: (isCorrect: boolean, answer: string) => void
}

export function TranslationExercise({ exercise, onComplete }: Props) {
  const [answer, setAnswer] = useState('')
  const [isRevealed, setIsRevealed] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [isPlayingAudio, setIsPlayingAudio] = useState(false)

  const handlePlayAudio = async () => {
    if (exercise.textAudio && !isPlayingAudio) {
      setIsPlayingAudio(true)
      await ElevenLabsService.playAudio(exercise.textAudio)
      setIsPlayingAudio(false)
    }
  }

  const checkAnswer = (userAnswer: string): boolean => {
    const normalized = userAnswer.toLowerCase().trim()
    const correctNormalized = exercise.correctAnswer.toLowerCase().trim()

    if (normalized === correctNormalized) return true

    if (exercise.alternativeAnswers) {
      return exercise.alternativeAnswers.some(
        alt => alt.toLowerCase().trim() === normalized
      )
    }

    return false
  }

  const handleSubmit = () => {
    if (!answer.trim()) return

    const correct = checkAnswer(answer)
    setIsCorrect(correct)
    setIsRevealed(true)

    if (correct) {
      playSuccessSound()
    } else {
      playErrorSound()
    }

    setTimeout(() => {
      onComplete(correct, answer)
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
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-2">
                Translate to {exercise.direction === 'kyrgyz-to-english' ? 'English' : 'Kyrgyz'}
              </p>
              <h2 className="text-3xl font-bold text-gray-900">{exercise.text}</h2>
            </div>
            {exercise.textAudio && (
              <button
                onClick={handlePlayAudio}
                disabled={isPlayingAudio}
                className="p-3 bg-primary-100 hover:bg-primary-200 rounded-full transition-colors disabled:opacity-50"
              >
                <Volume2 className="w-6 h-6 text-primary-600" />
              </button>
            )}
          </div>

          {exercise.hint && !isRevealed && (
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Hint:</strong> {exercise.hint}
              </p>
            </div>
          )}
        </div>

        <div className="mb-6">
          <Input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Type your translation..."
            disabled={isRevealed}
            className="text-lg"
          />
        </div>

        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div className={`p-4 rounded-xl flex items-center gap-3 ${
                isCorrect ? 'bg-success-50' : 'bg-danger-50'
              }`}>
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-6 h-6 text-success-600" />
                    <p className="text-success-900 font-medium">Perfect! 🎉</p>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6 text-danger-600" />
                    <div className="flex-1">
                      <p className="text-danger-900 font-medium mb-1">Not quite right</p>
                      <p className="text-sm text-gray-700">
                        <strong>Correct answer:</strong> {exercise.correctAnswer}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isRevealed && (
          <Button
            onClick={handleSubmit}
            disabled={!answer.trim()}
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
