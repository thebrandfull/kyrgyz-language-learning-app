import { create } from 'zustand'
import type { UserProgress, LessonSession } from '../types'

interface ProgressState {
  progress: UserProgress | null
  currentSession: LessonSession | null
  setProgress: (progress: UserProgress) => void
  updateXp: (xp: number) => void
  updateStreak: (streak: number) => void
  startLessonSession: (session: LessonSession) => void
  endLessonSession: () => void
  addExerciseAnswer: (answer: any) => void
}

export const useProgressStore = create<ProgressState>((set) => ({
  progress: null,
  currentSession: null,

  setProgress: (progress) => set({ progress }),

  updateXp: (xp) =>
    set((state) => ({
      progress: state.progress
        ? { ...state.progress, totalXp: state.progress.totalXp + xp }
        : null,
    })),

  updateStreak: (streak) =>
    set((state) => ({
      progress: state.progress
        ? { ...state.progress, currentStreak: streak }
        : null,
    })),

  startLessonSession: (session) => set({ currentSession: session }),

  endLessonSession: () => set({ currentSession: null }),

  addExerciseAnswer: (answer) =>
    set((state) => {
      if (!state.currentSession) return state
      return {
        currentSession: {
          ...state.currentSession,
          answers: [...state.currentSession.answers, answer],
          score: state.currentSession.answers.filter((a) => a.isCorrect).length + (answer.isCorrect ? 1 : 0),
          totalXp: state.currentSession.totalXp + answer.xpEarned,
        },
      }
    }),
}))
