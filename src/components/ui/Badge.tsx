import type { ReactNode } from 'react'

type Tone = 'green' | 'red' | 'blue' | 'amber' | 'gray' | 'pink' | 'purple'

const tones: Record<Tone, string> = {
  green: 'bg-green-100 text-green-700',
  red: 'bg-red-100 text-red-700',
  blue: 'bg-blue-100 text-blue-700',
  amber: 'bg-amber-100 text-amber-700',
  gray: 'bg-gray-100 text-gray-600',
  pink: 'bg-pink-100 text-pink-700',
  purple: 'bg-purple-100 text-purple-700',
}

interface BadgeProps {
  tone?: Tone
  children: ReactNode
  className?: string
}

export default function Badge({ tone = 'gray', children, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
