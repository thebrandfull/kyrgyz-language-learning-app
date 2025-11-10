import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'success' | 'outline' | 'danger' | 'warning' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  fullWidth?: boolean
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-bold rounded-2xl transition-all duration-100 flex items-center justify-center gap-2 duo-button disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-duo-green-500 hover:bg-duo-green-600 text-white shadow-button hover:shadow-button-pressed border-b-4 border-duo-green-700',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 shadow-button hover:shadow-button-pressed border-b-4 border-gray-400',
    success: 'bg-duo-green-500 hover:bg-duo-green-600 text-white shadow-button hover:shadow-button-pressed border-b-4 border-duo-green-700',
    warning: 'bg-duo-yellow-500 hover:bg-duo-yellow-600 text-gray-900 shadow-button hover:shadow-button-pressed border-b-4 border-duo-yellow-700',
    danger: 'bg-duo-red-500 hover:bg-duo-red-600 text-white shadow-button hover:shadow-button-pressed border-b-4 border-duo-red-700',
    outline: 'border-4 border-duo-green-500 text-duo-green-600 hover:bg-duo-green-50',
    ghost: 'text-gray-600 hover:bg-gray-100',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-8 py-4 text-base',
    lg: 'px-10 py-5 text-lg',
  }

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      disabled={disabled || isLoading}
      {...(props as any)}
    >
      {isLoading ? (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
          />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  )
}
