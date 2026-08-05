'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { supabase } from '@/lib/supabaseClient'
import { forgotPasswordSchema } from '@/lib/validators'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type ForgotForm = {
  email: string
}

export default function ForgotPasswordPage() {
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotForm>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  async function onSubmit(data: ForgotForm) {
    setStatus(null)
    setError(null)
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/login`,
    })

    if (error) {
      setError(error.message)
      return
    }

    setStatus('Password recovery email sent. Check your inbox.')
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white md:p-12">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-slate-900/95 p-10 shadow-soft backdrop-blur-xl">
        <div className="mb-10 space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Recover password</p>
          <h1 className="text-4xl font-semibold tracking-tight">Forgot your password?</h1>
          <p className="max-w-2xl text-sm text-slate-400">Enter your email and we’ll send a secure reset link so you can regain access quickly.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="hello@partnex.com" {...register('email')} />
            {errors.email && <p className="mt-2 text-sm text-rose-400">{errors.email.message}</p>}
          </div>

          {status && <p className="text-sm text-emerald-300">{status}</p>}
          {error && <p className="text-sm text-rose-400">{error}</p>}

          <Button type="submit">Send recovery email</Button>
        </form>
      </div>
    </div>
  )
}
