import type { HTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
  gradient?: boolean
}

export function Card({ children, hover = false, gradient = false, className, ...props }: CardProps) {
  const baseStyles = 'bg-white rounded-2xl shadow-soft p-6 transition-all duration-200'
  const hoverStyles = hover ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''
  const gradientStyles = gradient ? 'bg-gradient-to-br from-white to-blue-50' : ''

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(baseStyles, hoverStyles, gradientStyles, className)}
      {...(props as any)}
    >
      {children}
    </motion.div>
  )
}

export function CardHeader({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-xl font-bold text-gray-900', className)} {...props}>
      {children}
    </h3>
  )
}

export function CardDescription({ children, className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-sm text-gray-600 mt-1', className)} {...props}>
      {children}
    </p>
  )
}

export function CardContent({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('', className)} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mt-4 pt-4 border-t border-gray-100', className)} {...props}>
      {children}
    </div>
  )
}
