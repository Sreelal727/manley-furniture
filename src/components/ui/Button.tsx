import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'success' | 'outline' | 'ghost'

const variants: Record<Variant, string> = {
  primary: 'bg-brand-500 text-white hover:bg-brand-600',
  success: 'bg-green-500 text-white hover:bg-green-600',
  outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50',
  ghost: 'text-gray-600 hover:bg-gray-100',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
