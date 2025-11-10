import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}

export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1
}

export function xpForNextLevel(currentLevel: number): number {
  return Math.pow(currentLevel, 2) * 100
}

export function getStreakEmoji(streak: number): string {
  if (streak >= 365) return '🔥🔥🔥'
  if (streak >= 100) return '🔥🔥'
  if (streak >= 30) return '🔥'
  if (streak >= 7) return '⚡'
  return '✨'
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function getRandomItems<T>(array: T[], count: number): T[] {
  return shuffleArray(array).slice(0, count)
}

export function playSuccessSound() {
  const audio = new Audio('/sounds/success.mp3')
  audio.volume = 0.3
  audio.play().catch(() => {})
}

export function playErrorSound() {
  const audio = new Audio('/sounds/error.mp3')
  audio.volume = 0.3
  audio.play().catch(() => {})
}

export function playLevelUpSound() {
  const audio = new Audio('/sounds/levelup.mp3')
  audio.volume = 0.5
  audio.play().catch(() => {})
}
