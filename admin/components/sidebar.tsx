import { Home, FileText, Users, ImagePlus, Settings2, ShieldCheck, Sparkles } from 'lucide-react'

const navItems = [
  { label: 'Dashboard', icon: Home, href: '/' },
  { label: 'Home Page', icon: Sparkles, href: '/home' },
  { label: 'Services', icon: FileText, href: '/services' },
  { label: 'Portfolio', icon: FileText, href: '/portfolio' },
  { label: 'Team', icon: Users, href: '/team' },
  { label: 'Clients', icon: ImagePlus, href: '/clients' },
  { label: 'Testimonials', icon: Sparkles, href: '/testimonials' },
  { label: 'Blog', icon: FileText, href: '/blog' },
  { label: 'Media', icon: ImagePlus, href: '/media' },
  { label: 'Settings', icon: Settings2, href: '/settings' },
]

export function Sidebar() {
  return (
    <aside className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-soft">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-100 text-slate-900">P</div>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Partnex CMS</p>
          <p className="text-lg font-semibold text-slate-900">Admin Dashboard</p>
        </div>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </a>
        ))}
      </nav>
      <div className="mt-auto rounded-3xl bg-slate-50 p-4">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Role</p>
        <p className="mt-2 text-sm font-semibold text-slate-900">Super Admin</p>
      </div>
    </aside>
  )
}
