import DashboardShell from '@/components/dashboard-shell'

export default function Page() {
  return (
    <DashboardShell>
      <section className="grid gap-6 lg:grid-cols-[1.4fr,0.6fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Website Status</p>
                <h1 className="mt-3 text-3xl font-semibold text-slate-900">Live and healthy</h1>
              </div>
              <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">Online</span>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <QuickStat label="Published Pages" value="24" />
              <QuickStat label="Draft Pages" value="8" />
              <QuickStat label="Last Edited" value="2 hours ago" />
              <QuickStat label="Latest Uploads" value="12 files" />
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Analytics</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Weekly traffic overview</h2>
              </div>
            </div>
            <div className="mt-6 h-[320px] rounded-3xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Analytics chart placeholder</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Quick Actions</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Jump to work</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-3">
              <ActionCard label="Edit Home Page" description="Update hero, stats, testimonials, and CTA." />
              <ActionCard label="Manage Services" description="Create or update service offerings." />
              <ActionCard label="Review Leads" description="Check contact form submissions." />
            </div>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
            <h2 className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Activity feed</h2>
            <ul className="mt-6 space-y-4">
              <ActivityItem title="Draft service created" detail="By Sarah" time="10m ago" />
              <ActivityItem title="New testimonial uploaded" detail="By Omar" time="1h ago" />
              <ActivityItem title="Page changes published" detail="By Amina" time="2h ago" />
            </ul>
          </div>
        </div>
      </section>
    </DashboardShell>
  )
}

function QuickStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm uppercase tracking-[0.25em] text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
    </div>
  )
}

function ActionCard({ label, description }: { label: string; description: string }) {
  return (
    <button className="group w-full rounded-3xl border border-slate-200 bg-white p-4 text-left transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-soft">
      <p className="text-base font-semibold text-slate-900">{label}</p>
      <p className="mt-2 text-sm text-slate-500">{description}</p>
    </button>
  )
}

function ActivityItem({ title, detail, time }: { title: string; detail: string; time: string }) {
  return (
    <li className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
      <p className="font-semibold text-slate-900">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{detail}</p>
      <p className="mt-3 text-xs uppercase tracking-[0.2em] text-slate-400">{time}</p>
    </li>
  )
}
