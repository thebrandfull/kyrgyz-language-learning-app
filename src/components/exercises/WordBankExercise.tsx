import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle } from 'lucide-react'
import type { WordBankExercise as WordBankType } from '../../types'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { playSuccessSound, playErrorSound, cn } from '../../lib/utils'
import { Mascot } from '../Mascot'

interface Props {
  exercise: WordBankType
  onComplete: (isCorrect: boolean, answer: number[]) => void
}

export function WordBankExercise({ exercise, onComplete }: Props) {
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [availableWords, setAvailableWords] = useState<string[]>([...exercise.words])
  const [isRevealed, setIsRevealed] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  const handleWordClick = (word: string, fromAvailable: boolean) => {
    if (isRevealed) return

    if (fromAvailable) {
      setSelectedWords([...selectedWords, word])
      setAvailableWords(availableWords.filter((w) => w !== word))
    } else {
      setAvailableWords([...availableWords, word])
      setSelectedWords(selectedWords.filter((w) => w !== word))
    }
  }

  const checkAnswer = () => {
    const userOrder = selectedWords.map((word) => exercise.words.indexOf(word))
    const correct = JSON.stringify(userOrder) === JSON.stringify(exercise.correctOrder)

    setIsCorrect(correct)
    setIsRevealed(true)

    if (correct) {
      playSuccessSound()
    } else {
      playErrorSound()
    }

    setTimeout(() => {
      onComplete(correct, userOrder)
    }, 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto"
    >
      {/* Mascot with instruction */}
      <div className="mb-8">
        <Mascot emotion="thinking" size="md" animate />
        <p className="text-center mt-4 text-xl font-bold text-gray-800">
          Tap the words in order to match the translation
        </p>
      </div>

      <Card className="p-8">
        {/* Sentence in English */}
        <div className="mb-8 p-6 bg-duo-blue-50 rounded-2xl border-2 border-duo-blue-200">
          <p className="text-2xl font-bold text-center text-gray-800">{exercise.sentence}</p>
        </div>

        {/* Selected Words Area */}
        <div className="mb-6 min-h-24 p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
          <div className="flex flex-wrap gap-2">
            {selectedWords.map((word, index) => (
              <motion.button
                key={`selected-${word}-${index}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleWordClick(word, false)}
                disabled={isRevealed}
                className={cn(
                  'px-6 py-3 rounded-xl font-bold text-lg transition-all duo-button',
                  isRevealed && isCorrect
                    ? 'bg-duo-green-500 text-white border-b-4 border-duo-green-700'
                    : isRevealed && !isCorrect
                    ? 'bg-duo-red-500 text-white border-b-4 border-duo-red-700'
                    : 'bg-white border-2 border-gray-300 hover:border-duo-blue-500'
                )}
              >
                {word}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Available Words */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {availableWords.map((word, index) => (
              <motion.button
                key={`available-${word}-${index}`}
                layout
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleWordClick(word, true)}
                disabled={isRevealed}
                className="px-6 py-3 bg-white border-2 border-gray-300 hover:border-duo-green-500 hover:bg-duo-green-50 rounded-xl font-bold text-lg transition-all duo-button"
              >
                {word}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Result Message */}
        <AnimatePresence>
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6"
            >
              <div
                className={cn(
                  'p-6 rounded-2xl flex items-center gap-4',
                  isCorrect ? 'bg-duo-green-100 border-2 border-duo-green-500' : 'bg-duo-red-100 border-2 border-duo-red-500'
                )}
              >
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-8 h-8 text-duo-green-700" />
                    <div>
                      <p className="text-duo-green-900 font-bold text-lg">Awesome! 🎉</p>
                      <p className="text-duo-green-800">Perfect translation!</p>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-8 h-8 text-duo-red-700" />
                    <div>
                      <p className="text-duo-red-900 font-bold text-lg">Not quite!</p>
                      <p className="text-duo-red-800">Correct order: {exercise.correctOrder.map((i) => exercise.words[i]).join(' ')}</p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Check Button */}
        {!isRevealed && (
          <Button
            onClick={checkAnswer}
            disabled={selectedWords.length !== exercise.words.length}
            fullWidth
            size="lg"
            variant="primary"
          >
            CHECK
          </Button>
        )}
      </Card>
    </motion.div>
  )
}
