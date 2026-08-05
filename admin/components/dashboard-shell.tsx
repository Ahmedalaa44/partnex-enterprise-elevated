import { ReactNode } from 'react'
import { Sidebar } from './sidebar'

export default function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div className="grid min-h-screen grid-cols-[280px_1fr] gap-6 p-6 xl:gap-8 xl:p-10">
        <Sidebar />
        <main className="space-y-6">{children}</main>
      </div>
    </div>
  )
}
