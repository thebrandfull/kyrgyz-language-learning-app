import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-3 rounded-xl border-2 border-gray-200',
            'focus:border-primary-500 focus:ring-4 focus:ring-primary-100',
            'outline-none transition-all duration-200',
            'disabled:bg-gray-50 disabled:cursor-not-allowed',
            error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-100',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-danger-600 mt-1">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
