import { InputHTMLAttributes, forwardRef } from 'react'
import clsx from 'clsx'

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={clsx(
      'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/10',
      className
    )}
    {...props}
  />
))
Input.displayName = 'Input'
export { Input }
