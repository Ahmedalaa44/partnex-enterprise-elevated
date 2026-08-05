'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '@/lib/supabaseClient'
import { loginSchema } from '@/lib/validators'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type LoginForm = {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data: LoginForm) {
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/')
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white md:p-12">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-slate-900/95 p-10 shadow-soft backdrop-blur-xl">
        <div className="mb-10 space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Partnex Admin</p>
          <h1 className="text-4xl font-semibold tracking-tight">Sign in to your dashboard</h1>
          <p className="max-w-2xl text-sm text-slate-400">Manage pages, services, portfolio, users, and site settings from one premium admin experience.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="hello@partnex.com" {...register('email')} />
            {errors.email && <p className="mt-2 text-sm text-rose-400">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" {...register('password')} />
            {errors.password && <p className="mt-2 text-sm text-rose-400">{errors.password.message}</p>}
          </div>

          {error ? <p className="text-sm text-rose-400">{error}</p> : null}

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
            <a href="/forgot-password" className="text-sm text-slate-400 hover:text-white">
              Forgot password?
            </a>
          </div>
        </form>

        <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-950/90 p-5 text-sm text-slate-500">
          <p className="font-medium text-slate-100">Supported login</p>
          <p className="mt-2">Supabase Authentication with role-based access support for Super Admin, Admin, Editor, and Marketing.</p>
        </div>
      </div>
    </div>
  )
}
