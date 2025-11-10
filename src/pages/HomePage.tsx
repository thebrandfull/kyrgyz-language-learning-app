import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BookOpen, Zap, Target, Award } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { useAuthStore } from '../store/authStore'
import { useProgressStore } from '../store/progressStore'
import { XpBar } from '../components/gamification/XpBar'
import { StreakDisplay } from '../components/gamification/StreakDisplay'
import { CircularProgress } from '../components/ui/Progress'

export function HomePage() {
  const { user } = useAuthStore()
  const { progress } = useProgressStore()

  if (!user || !progress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-6xl font-display font-bold text-gradient mb-4">
            Learn Kyrgyz
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Master the Kyrgyz language with AI-powered lessons and gamification
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  const todayLessons = 5 // Mock data
  const completedToday = 2 // Mock data

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-display font-bold mb-2">
          Welcome back, {user.displayName}! 👋
        </h1>
        <p className="text-gray-600 text-lg">
          Ready to continue your Kyrgyz learning journey?
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card gradient>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-warning-500" />
              <CardTitle>Current Streak</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <StreakDisplay streak={progress.currentStreak} />
          </CardContent>
        </Card>

        <Card gradient>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary-500" />
              <CardTitle>Daily Goal</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex justify-center">
            <CircularProgress value={completedToday} max={todayLessons} size={100} />
          </CardContent>
        </Card>

        <Card gradient>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-success-500" />
              <CardTitle>Lessons Completed</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-gradient">{progress.lessonsCompleted}</p>
          </CardContent>
        </Card>

        <Card gradient>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-500" />
              <CardTitle>Achievements</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-gradient">{progress.achievements.length}</p>
          </CardContent>
        </Card>
      </div>

      {/* XP Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>Keep learning to level up!</CardDescription>
        </CardHeader>
        <CardContent>
          <XpBar currentXp={progress.totalXp} />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card hover className="cursor-pointer" onClick={() => (window.location.href = '/learn')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-primary-500" />
              Continue Learning
            </CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
        </Card>

        <Card hover className="cursor-pointer" onClick={() => (window.location.href = '/practice')}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-warning-500" />
              Practice with AI
            </CardTitle>
            <CardDescription>Have a conversation in Kyrgyz</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  )
}
