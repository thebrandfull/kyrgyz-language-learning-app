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
  gems: number
  lingots: number
  hearts: number
  streakFreezes: number
  currentLeague: string
  leagueRank: number
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
  | 'word-bank'
  | 'tap-pairs'
  | 'picture-selection'
  | 'word-order'
  | 'complete-sentence'

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

export interface WordBankExercise extends BaseExercise {
  type: 'word-bank'
  sentence: string
  sentenceAudio?: string
  words: string[]
  correctOrder: number[]
}

export interface TapPairsExercise extends BaseExercise {
  type: 'tap-pairs'
  pairs: Array<{
    left: string
    right: string
    leftAudio?: string
    rightAudio?: string
  }>
}

export interface PictureSelectionExercise extends BaseExercise {
  type: 'picture-selection'
  audio: string
  word: string
  images: Array<{
    id: string
    url: string
    label: string
  }>
  correctImageId: string
}

export interface WordOrderExercise extends BaseExercise {
  type: 'word-order'
  prompt: string
  words: string[]
  correctOrder: string[]
  audio?: string
}

export interface CompleteSentenceExercise extends BaseExercise {
  type: 'complete-sentence'
  sentence: string
  blankWord: string
  wordBank: string[]
  audio?: string
}

export type Exercise =
  | MultipleChoiceExercise
  | TranslationExercise
  | ListeningExercise
  | SpeakingExercise
  | MatchingExercise
  | FillBlankExercise
  | ConversationExercise
  | WordBankExercise
  | TapPairsExercise
  | PictureSelectionExercise
  | WordOrderExercise
  | CompleteSentenceExercise

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

// Currency & Shop types
export interface ShopItem {
  id: string
  name: string
  description: string
  icon: string
  price: number
  currency: 'gems' | 'lingots'
  type: 'power-up' | 'cosmetic' | 'boost'
  category: string
}

export interface PowerUp {
  id: string
  name: string
  description: string
  icon: string
  duration?: number
  quantity: number
  type: 'streak-freeze' | 'xp-boost' | 'heart-refill' | 'timer-boost'
}

// League types
export interface League {
  id: string
  name: string
  tier: number
  icon: string
  color: string
  minXp: number
  maxXp: number
  promotionCount: number
  relegationCount: number
}

export interface LeagueParticipant {
  userId: string
  username: string
  displayName: string
  avatarUrl?: string
  weeklyXp: number
  totalXp: number
  rank: number
  promotion?: boolean
  relegation?: boolean
}

// Daily Quest types
export interface DailyQuest {
  id: string
  title: string
  description: string
  icon: string
  type: 'lessons' | 'xp' | 'perfect' | 'streak' | 'practice'
  target: number
  current: number
  reward: {
    gems?: number
    xp?: number
    lingots?: number
  }
  expiresAt: string
  completed: boolean
}

// Combo & Streak types
export interface ComboState {
  current: number
  max: number
  multiplier: number
  lastCorrectAt?: Date
}
