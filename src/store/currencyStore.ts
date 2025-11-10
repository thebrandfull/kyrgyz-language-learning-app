import { create } from 'zustand'
import type { PowerUp } from '../types'

interface CurrencyState {
  gems: number
  lingots: number
  hearts: number
  maxHearts: number
  powerUps: PowerUp[]

  addGems: (amount: number) => void
  spendGems: (amount: number) => boolean
  addLingots: (amount: number) => void
  spendLingots: (amount: number) => boolean

  addHearts: (amount: number) => void
  loseHeart: () => boolean
  refillHearts: () => void

  addPowerUp: (powerUp: PowerUp) => void
  usePowerUp: (powerUpId: string) => boolean
  getPowerUp: (type: PowerUp['type']) => PowerUp | undefined
}

export const useCurrencyStore = create<CurrencyState>((set, get) => ({
  gems: 0,
  lingots: 0,
  hearts: 5,
  maxHearts: 5,
  powerUps: [],

  addGems: (amount) => set((state) => ({ gems: state.gems + amount })),

  spendGems: (amount) => {
    const { gems } = get()
    if (gems >= amount) {
      set({ gems: gems - amount })
      return true
    }
    return false
  },

  addLingots: (amount) => set((state) => ({ lingots: state.lingots + amount })),

  spendLingots: (amount) => {
    const { lingots } = get()
    if (lingots >= amount) {
      set({ lingots: lingots - amount })
      return true
    }
    return false
  },

  addHearts: (amount) =>
    set((state) => ({
      hearts: Math.min(state.hearts + amount, state.maxHearts),
    })),

  loseHeart: () => {
    const { hearts } = get()
    if (hearts > 0) {
      set({ hearts: hearts - 1 })
      return true
    }
    return false
  },

  refillHearts: () => set((state) => ({ hearts: state.maxHearts })),

  addPowerUp: (powerUp) =>
    set((state) => {
      const existing = state.powerUps.find((p) => p.id === powerUp.id)
      if (existing) {
        return {
          powerUps: state.powerUps.map((p) =>
            p.id === powerUp.id ? { ...p, quantity: p.quantity + powerUp.quantity } : p
          ),
        }
      }
      return { powerUps: [...state.powerUps, powerUp] }
    }),

  usePowerUp: (powerUpId) => {
    const { powerUps } = get()
    const powerUp = powerUps.find((p) => p.id === powerUpId)
    if (powerUp && powerUp.quantity > 0) {
      set({
        powerUps: powerUps.map((p) =>
          p.id === powerUpId ? { ...p, quantity: p.quantity - 1 } : p
        ).filter((p) => p.quantity > 0),
      })
      return true
    }
    return false
  },

  getPowerUp: (type) => {
    const { powerUps } = get()
    return powerUps.find((p) => p.type === type && p.quantity > 0)
  },
}))
