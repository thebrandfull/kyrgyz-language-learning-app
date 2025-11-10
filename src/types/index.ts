// User types
export interface User {
  id: string
  email: string
  username: string
  displayName: string
  avatarUrl?: string
  createdAt: string
  updatedAt: string
}

export interface UserProgress {
  userId: string
  totalXp: number
  currentStreak: number
  longestStreak: number
  lastActiveDate: string
  level: number
  lessonsCompleted: number
  perfectLessons: number
  achievements: Achievement[]
}

// Lesson types
export interface Lesson {
  id: string
  title: string
  description: string
  order: number
  unitId: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  exercises: Exercise[]
  xpReward: number
  isLocked: boolean
  prerequisiteLessonIds: string[]
}

export interface Unit {
  id: string
  title: string
  description: string
  order: number
  courseId: string
  lessons: Lesson[]
  color: string
  icon: string
}

export interface Course {
  id: string
  title: string
  description: string
  language: string
  units: Unit[]
}

// Exercise types
export type ExerciseType =
  | 'multiple-choice'
  | 'translation'
  | 'listening'
  | 'speaking'
  | 'matching'
  | 'fill-blank'
  | 'conversation'

export interface BaseExercise {
  id: string
  type: ExerciseType
  lessonId: string
  order: number
  xpReward: number
}

export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple-choice'
  question: string
  questionAudio?: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export interface TranslationExercise extends BaseExercise {
  type: 'translation'
  text: string
  textAudio?: string
  direction: 'kyrgyz-to-english' | 'english-to-kyrgyz'
  correctAnswer: string
  alternativeAnswers?: string[]
  hint?: string
}

export interface ListeningExercise extends BaseExercise {
  type: 'listening'
  audioUrl: string
  text: string
  question: string
  options: string[]
  correctAnswer: number
}

export interface SpeakingExercise extends BaseExercise {
  type: 'speaking'
  text: string
  textAudio: string
  expectedPronunciation: string
  minConfidence: number
}

export interface MatchingExercise extends BaseExercise {
  type: 'matching'
  pairs: Array<{
    kyrgyz: string
    english: string
    audio?: string
  }>
}

export interface FillBlankExercise extends BaseExercise {
  type: 'fill-blank'
  sentence: string
  sentenceAudio?: string
  blankIndex: number
  options: string[]
  correctAnswer: number
}

export interface ConversationExercise extends BaseExercise {
  type: 'conversation'
  scenario: string
  initialPrompt: string
  expectedTopic: string
  minTurns: number
}

export type Exercise =
  | MultipleChoiceExercise
  | TranslationExercise
  | ListeningExercise
  | SpeakingExercise
  | MatchingExercise
  | FillBlankExercise
  | ConversationExercise

// Session types
export interface LessonSession {
  lessonId: string
  exercises: Exercise[]
  currentExerciseIndex: number
  answers: ExerciseAnswer[]
  score: number
  totalXp: number
  startedAt: string
  completedAt?: string
}

export interface ExerciseAnswer {
  exerciseId: string
  isCorrect: boolean
  userAnswer: string | number
  timeSpent: number
  xpEarned: number
}

// Gamification types
export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlockedAt?: string
  progress?: number
  maxProgress?: number
}

export interface LeaderboardEntry {
  userId: string
  username: string
  displayName: string
  avatarUrl?: string
  totalXp: number
  level: number
  currentStreak: number
  rank: number
}

// Vocabulary types
export interface VocabularyWord {
  id: string
  kyrgyz: string
  english: string
  pronunciation: string
  audioUrl?: string
  category: string
  difficulty: number
  examples: Array<{
    kyrgyz: string
    english: string
    audioUrl?: string
  }>
}

// AI types
export interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
  audioUrl?: string
  timestamp: string
}

export interface ConversationSession {
  id: string
  userId: string
  scenario: string
  messages: ConversationMessage[]
  startedAt: string
  endedAt?: string
  feedback?: {
    score: number
    strengths: string[]
    improvements: string[]
  }
}
