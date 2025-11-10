import { create } from 'zustand'
import type { Course, Lesson } from '../types'

interface LessonState {
  courses: Course[]
  currentLesson: Lesson | null
  completedLessonIds: string[]
  setCourses: (courses: Course[]) => void
  setCurrentLesson: (lesson: Lesson | null) => void
  markLessonCompleted: (lessonId: string) => void
  isLessonUnlocked: (lesson: Lesson) => boolean
}

export const useLessonStore = create<LessonState>((set, get) => ({
  courses: [],
  currentLesson: null,
  completedLessonIds: [],

  setCourses: (courses) => set({ courses }),

  setCurrentLesson: (lesson) => set({ currentLesson: lesson }),

  markLessonCompleted: (lessonId) =>
    set((state) => ({
      completedLessonIds: [...new Set([...state.completedLessonIds, lessonId])],
    })),

  isLessonUnlocked: (lesson) => {
    const { completedLessonIds } = get()
    if (lesson.prerequisiteLessonIds.length === 0) return true
    return lesson.prerequisiteLessonIds.every((id) => completedLessonIds.includes(id))
  },
}))
