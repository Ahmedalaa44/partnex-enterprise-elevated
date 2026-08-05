import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

export function Button({ className, variant = 'primary', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }) {
  return (
    <button
      className={clsx(
        'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:pointer-events-none disabled:opacity-50',
        variant === 'primary' && 'bg-primary text-white shadow-lg shadow-primary/10 hover:bg-primaryDark',
        variant === 'secondary' && 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50',
        variant === 'ghost' && 'bg-transparent text-slate-700 hover:bg-slate-100',
        className
      )}
      {...props}
    />
  )
}
