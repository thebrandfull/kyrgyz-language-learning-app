import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Trophy, Star } from 'lucide-react'
import { MultipleChoiceExercise } from '../components/exercises/MultipleChoiceExercise'
import { TranslationExercise } from '../components/exercises/TranslationExercise'
import { ListeningExercise } from '../components/exercises/ListeningExercise'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Progress } from '../components/ui/Progress'
import type { Exercise } from '../types'
import { useProgressStore } from '../store/progressStore'
import { playLevelUpSound } from '../lib/utils'

// Mock lesson data
const mockExercises: Exercise[] = [
  {
    id: '1',
    type: 'multiple-choice',
    lessonId: '1-1',
    order: 1,
    xpReward: 10,
    question: 'How do you say "Hello" in Kyrgyz?',
    options: ['Салам', 'Рахмат', 'Кош', 'Кечиресиз'],
    correctAnswer: 0,
    explanation: 'Салам (Salam) is the most common way to say hello in Kyrgyz.',
  },
  {
    id: '2',
    type: 'translation',
    lessonId: '1-1',
    order: 2,
    xpReward: 15,
    text: 'Good morning',
    direction: 'english-to-kyrgyz',
    correctAnswer: 'Кайрылуу таң',
    alternativeAnswers: ['Кутмандуу таң'],
    hint: 'Think about the greeting you use in the morning',
  },
  {
    id: '3',
    type: 'listening',
    lessonId: '1-1',
    order: 3,
    xpReward: 20,
    audioUrl: '/audio/sample.mp3',
    text: 'Кандайсыз?',
    question: 'What does the speaker ask?',
    options: ['How are you?', 'What is your name?', 'Where are you from?', 'Thank you'],
    correctAnswer: 0,
  },
]

export function LessonPage() {
  const navigate = useNavigate()
  const { updateXp } = useProgressStore()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [totalXp, setTotalXp] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [hearts, setHearts] = useState(3)

  const currentExercise = mockExercises[currentIndex]
  const progress = ((currentIndex + 1) / mockExercises.length) * 100

  const handleExerciseComplete = (isCorrect: boolean, _answer: any) => {
    if (isCorrect) {
      setScore(score + 1)
      setTotalXp(totalXp + currentExercise.xpReward)
      updateXp(currentExercise.xpReward)
    } else {
      setHearts(hearts - 1)
      if (hearts <= 1) {
        // Game over
        setTimeout(() => navigate('/learn'), 1500)
        return
      }
    }

    setTimeout(() => {
      if (currentIndex < mockExercises.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        setIsComplete(true)
        playLevelUpSound()
      }
    }, 1500)
  }

  const handleExit = () => {
    if (window.confirm('Are you sure you want to exit? Your progress will be lost.')) {
      navigate('/learn')
    }
  }

  if (isComplete) {
    const isPerfect = score === mockExercises.length

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ type: 'spring', duration: 0.8 }}
            className="mb-6"
          >
            <Trophy className="w-24 h-24 text-warning-500 mx-auto" />
          </motion.div>

          <h1 className="text-4xl font-bold text-gradient mb-2">
            {isPerfect ? 'Perfect! 🎉' : 'Lesson Complete! '}
          </h1>
          <p className="text-gray-600 text-lg mb-8">You did an amazing job!</p>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Score</p>
              <p className="text-3xl font-bold text-primary-600">
                {score}/{mockExercises.length}
              </p>
            </div>
            <div className="p-6 bg-gradient-to-br from-warning-50 to-yellow-50 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">XP Earned</p>
              <p className="text-3xl font-bold text-warning-600">+{totalXp}</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => navigate('/learn')} className="flex-1">
              Continue Learning
            </Button>
            <Button onClick={() => window.location.reload()} className="flex-1">
              Practice Again
            </Button>
          </div>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={handleExit}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        <div className="flex-1">
          <Progress value={progress} max={100} />
        </div>

        <div className="flex items-center gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              animate={i >= hearts ? { scale: [1, 0.5], opacity: [1, 0.3] } : {}}
            >
              <Star
                className={`w-6 h-6 ${
                  i < hearts ? 'fill-danger-500 text-danger-500' : 'text-gray-300'
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Exercise */}
      <AnimatePresence mode="wait">
        {currentExercise.type === 'multiple-choice' && (
          <MultipleChoiceExercise
            key={currentExercise.id}
            exercise={currentExercise}
            onComplete={handleExerciseComplete}
          />
        )}
        {currentExercise.type === 'translation' && (
          <TranslationExercise
            key={currentExercise.id}
            exercise={currentExercise}
            onComplete={handleExerciseComplete}
          />
        )}
        {currentExercise.type === 'listening' && (
          <ListeningExercise
            key={currentExercise.id}
            exercise={currentExercise}
            onComplete={handleExerciseComplete}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
