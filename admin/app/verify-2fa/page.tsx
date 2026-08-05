'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Verify2FAPage() {
  const [code, setCode] = useState('')
  const [status, setStatus] = useState<string | null>(null)

  function handleVerify(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('Verifying your authentication code…')
    setTimeout(() => setStatus('Two-factor authentication verified. Redirecting…'), 1000)
  }

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white md:p-12">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-slate-900/95 p-10 shadow-soft backdrop-blur-xl">
        <div className="mb-10 space-y-3">
          <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Two-factor authentication</p>
          <h1 className="text-4xl font-semibold tracking-tight">Secure your account</h1>
          <p className="max-w-2xl text-sm text-slate-400">Enter your authentication code from your authenticator app to continue into the admin dashboard.</p>
        </div>

        <form className="space-y-6" onSubmit={handleVerify}>
          <div>
            <Label htmlFor="code">Authentication code</Label>
            <Input id="code" type="text" placeholder="123456" value={code} onChange={(event) => setCode(event.target.value)} />
          </div>

          {status && <p className="text-sm text-emerald-300">{status}</p>}
          <Button type="submit">Verify code</Button>
        </form>
      </div>
    </div>
  )
}
