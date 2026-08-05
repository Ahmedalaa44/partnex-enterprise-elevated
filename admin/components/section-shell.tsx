import { ReactNode } from 'react'

export default function SectionShell({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">{title}</p>
        <p className="mt-3 text-2xl font-semibold text-slate-950">{description}</p>
      </div>
      {children}
    </section>
  )
}
