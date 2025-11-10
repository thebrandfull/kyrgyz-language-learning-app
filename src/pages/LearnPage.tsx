import { motion } from 'framer-motion'
import { Lock, CheckCircle, Play } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Progress } from '../components/ui/Progress'
import { useNavigate } from 'react-router-dom'
import { cn } from '../lib/utils'

// Mock data for demonstration
const mockUnits = [
  {
    id: '1',
    title: 'Basics',
    description: 'Learn fundamental Kyrgyz phrases and greetings',
    color: 'from-blue-400 to-blue-600',
    icon: '👋',
    lessons: [
      { id: '1-1', title: 'Greetings', progress: 100, isLocked: false },
      { id: '1-2', title: 'Introductions', progress: 50, isLocked: false },
      { id: '1-3', title: 'Basic Phrases', progress: 0, isLocked: false },
    ],
  },
  {
    id: '2',
    title: 'Food & Dining',
    description: 'Order food and discuss meals in Kyrgyz',
    color: 'from-green-400 to-green-600',
    icon: '🍽️',
    lessons: [
      { id: '2-1', title: 'Food Vocabulary', progress: 0, isLocked: false },
      { id: '2-2', title: 'At the Restaurant', progress: 0, isLocked: true },
      { id: '2-3', title: 'Cooking & Recipes', progress: 0, isLocked: true },
    ],
  },
  {
    id: '3',
    title: 'Travel & Directions',
    description: 'Navigate and explore Kyrgyzstan',
    color: 'from-purple-400 to-purple-600',
    icon: '🗺️',
    lessons: [
      { id: '3-1', title: 'Asking for Directions', progress: 0, isLocked: true },
      { id: '3-2', title: 'Transportation', progress: 0, isLocked: true },
      { id: '3-3', title: 'Tourist Phrases', progress: 0, isLocked: true },
    ],
  },
  {
    id: '4',
    title: 'Culture & Traditions',
    description: 'Understand Kyrgyz culture and customs',
    color: 'from-pink-400 to-pink-600',
    icon: '🎭',
    lessons: [
      { id: '4-1', title: 'Holidays & Celebrations', progress: 0, isLocked: true },
      { id: '4-2', title: 'Traditional Customs', progress: 0, isLocked: true },
      { id: '4-3', title: 'Modern Kyrgyzstan', progress: 0, isLocked: true },
    ],
  },
]

export function LearnPage() {
  const navigate = useNavigate()

  const handleLessonClick = (lessonId: string, isLocked: boolean) => {
    if (!isLocked) {
      navigate(`/lesson/${lessonId}`)
    }
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-display font-bold text-gradient mb-2">
          Learning Path
        </h1>
        <p className="text-gray-600 text-lg">
          Follow the path and master Kyrgyz step by step
        </p>
      </motion.div>

      <div className="space-y-12">
        {mockUnits.map((unit, unitIndex) => (
          <motion.div
            key={unit.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: unitIndex * 0.1 }}
          >
            <Card className="overflow-hidden">
              <div className={`bg-gradient-to-r ${unit.color} p-6 text-white`}>
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{unit.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold">{unit.title}</h2>
                    <p className="text-white/90 mt-1">{unit.description}</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid gap-4">
                  {unit.lessons.map((lesson, lessonIndex) => (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: unitIndex * 0.1 + lessonIndex * 0.05 }}
                    >
                      <div
                        onClick={() => handleLessonClick(lesson.id, lesson.isLocked)}
                        className={cn(
                          'flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200',
                          lesson.isLocked
                            ? 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
                            : 'bg-white border-gray-200 hover:border-primary-300 hover:shadow-md cursor-pointer'
                        )}
                      >
                        <div
                          className={cn(
                            'w-12 h-12 rounded-full flex items-center justify-center',
                            lesson.progress === 100
                              ? 'bg-success-100'
                              : lesson.isLocked
                              ? 'bg-gray-200'
                              : 'bg-primary-100'
                          )}
                        >
                          {lesson.isLocked ? (
                            <Lock className="w-6 h-6 text-gray-400" />
                          ) : lesson.progress === 100 ? (
                            <CheckCircle className="w-6 h-6 text-success-600" />
                          ) : (
                            <Play className="w-6 h-6 text-primary-600" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{lesson.title}</h3>
                            {lesson.progress === 100 && (
                              <Badge variant="success">Completed</Badge>
                            )}
                            {lesson.progress > 0 && lesson.progress < 100 && (
                              <Badge variant="info">In Progress</Badge>
                            )}
                          </div>
                          {!lesson.isLocked && lesson.progress < 100 && (
                            <Progress value={lesson.progress} max={100} />
                          )}
                        </div>

                        {!lesson.isLocked && (
                          <Button variant={lesson.progress === 100 ? 'secondary' : 'primary'}>
                            {lesson.progress === 100 ? 'Review' : lesson.progress > 0 ? 'Continue' : 'Start'}
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
