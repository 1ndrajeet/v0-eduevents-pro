'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import {
  Activity,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  Download,
  GraduationCap,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Ticket,
  TrendingUp,
  Users,
  X,
} from 'lucide-react'

const registrations = [
  { initials: 'JD', name: 'John Doe', detail: 'CS Dept · 3rd Year', event: 'Tech Fest 2024', date: 'Oct 12, 09:41 AM', status: 'Confirmed', tone: 'success' },
  { initials: 'AS', name: 'Alice Smith', detail: 'IT Dept · 2nd Year', event: 'Coding Contest', date: 'Oct 12, 08:15 AM', status: 'Pending', tone: 'warning' },
  { initials: 'RJ', name: 'Robert Johnson', detail: 'Mech Dept · 4th Year', event: 'Tech Fest 2024', date: 'Oct 11, 02:20 PM', status: 'Confirmed', tone: 'success' },
]

const events = [
  { month: 'OCT', day: '15', title: 'Tech Fest 2024', place: 'Main Auditorium', regs: '120 Reg.', icon: Ticket, color: 'indigo' },
  { month: 'OCT', day: '22', title: 'Coding Contest', place: 'Computer Lab 3', regs: '45 Reg.', icon: Activity, color: 'blue' },
  { month: 'NOV', day: '05', title: 'Career Fair', place: 'Student Union', regs: '0 Reg.', icon: GraduationCap, color: 'slate' },
]

function NavItem({ icon: Icon, label, active, onClick }: { icon: typeof LayoutDashboard; label: string; active?: boolean; onClick: () => void }) {
  return <button onClick={onClick} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}><Icon size={18} /><span>{label}</span></button>
}

export function EventDashboard({ userEmail }: { userEmail: string }) {
  const router = useRouter()
  const [active, setActive] = useState('Dashboard')
  const [mobileNav, setMobileNav] = useState(false)
  const [query, setQuery] = useState('')
  const [range, setRange] = useState('This Week')
  const [toast, setToast] = useState('')
  const filtered = useMemo(() => registrations.filter((item) => `${item.name} ${item.event}`.toLowerCase().includes(query.toLowerCase())), [query])
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2400) }

  return <div className="min-h-screen bg-background text-foreground">
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-card p-4 transition-transform md:translate-x-0 ${mobileNav ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between gap-3 px-2 py-3"><div className="flex items-center gap-3"><div className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground"><GraduationCap size={22} /></div><div><p className="font-semibold tracking-tight">EduEvents</p><p className="text-xs text-muted-foreground">Admin workspace</p></div></div><button className="md:hidden" onClick={() => setMobileNav(false)} aria-label="Close navigation"><X size={18} /></button></div>
      <div className="mt-8 space-y-1">{[[LayoutDashboard, 'Dashboard'], [CalendarDays, 'Events'], [Users, 'Students'], [TrendingUp, 'Reports'], [Settings, 'Settings']].map(([Icon, label]) => <NavItem key={label as string} icon={Icon as typeof LayoutDashboard} label={label as string} active={active === label} onClick={() => { setActive(label as string); setMobileNav(false) }} />)}</div>
      <div className="mt-auto space-y-1 border-t pt-4"><button onClick={() => notify('Support center opened')} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted"><CircleHelp size={18} />Support</button><button onClick={async () => { await createClient().auth.signOut(); router.push('/auth/login'); router.refresh() }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted">Sign out</button></div>
    </aside>
    {mobileNav && <button aria-label="Close menu" className="fixed inset-0 z-40 bg-foreground/20 md:hidden" onClick={() => setMobileNav(false)} />}
    <div className="md:pl-64"><header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/90 px-5 backdrop-blur md:px-10"><div className="flex items-center gap-3"><button className="rounded-lg p-2 hover:bg-muted md:hidden" onClick={() => setMobileNav(true)} aria-label="Open navigation"><Menu size={20} /></button><div className="relative hidden sm:block"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search events, students, or reports" className="h-9 w-72 rounded-full border bg-card pl-9 pr-4 text-sm outline-none ring-primary focus:ring-2" /></div></div><div className="flex items-center gap-2"><button onClick={() => notify('No new notifications')} className="rounded-lg p-2.5 text-muted-foreground hover:bg-muted" aria-label="Notifications"><Bell size={18} /></button><div className="ml-2 flex items-center gap-3 border-l pl-4"><div className="hidden text-right sm:block"><p className="text-sm font-medium">Admin User</p><p className="text-xs text-muted-foreground">{userEmail || 'Administrator'}</p></div><div className="grid size-9 place-items-center rounded-full bg-primary/10 text-sm font-semibold text-primary">AU</div></div></div></header>
      <main className="mx-auto max-w-[1440px] p-5 md:p-10"><div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-2 text-sm font-medium text-primary">Tuesday, October 15, 2024</p><h1 className="text-3xl font-semibold tracking-tight md:text-4xl">Welcome back, Admin</h1><p className="mt-2 text-muted-foreground">Here is what&apos;s happening with your college events today.</p></div><div className="flex gap-3"><button onClick={() => notify('Report exported successfully')} className="inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2.5 text-sm font-medium hover:bg-muted"><Download size={16} />Export report</button><button onClick={() => notify('Create event form opened')} className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90"><Plus size={17} />New event</button></div></div>
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><Stat icon={GraduationCap} label="Total students" value="2,847" change="+5.2%" /><Stat icon={CalendarDays} label="Active events" value="12" change="+2 this month" /><Stat icon={Users} label="Registrations" value="156" change="+12%" /><Stat icon={Ticket} label="Revenue" value="$4,280" change="+8.1%" /></section>
        <section className="mt-6 grid gap-6 xl:grid-cols-[1.6fr_1fr]"><div className="rounded-xl border bg-card"><div className="flex items-center justify-between border-b p-5"><div><h2 className="font-semibold">Registration trends</h2><p className="mt-1 text-xs text-muted-foreground">Daily registrations across all events</p></div><select value={range} onChange={(e) => setRange(e.target.value)} className="rounded-lg border bg-background px-3 py-2 text-xs font-medium outline-none"><option>This Week</option><option>This Month</option><option>This Year</option></select></div><div className="h-72 p-5"><div className="flex h-full items-end gap-3 border-b border-l px-3 pb-0 pt-5">{[32, 48, 43, 67, 82, 58, 91].map((height, i) => <div key={i} className="group flex h-full flex-1 flex-col justify-end gap-2"><div className="relative rounded-t-md bg-primary/80 transition-all group-hover:bg-primary" style={{ height: `${height}%` }}><span className="absolute -top-6 left-1/2 hidden -translate-x-1/2 text-xs font-semibold group-hover:block">{Math.round(height * 1.4)}</span></div><span className="text-center text-[11px] text-muted-foreground">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</span></div>)}</div></div></div><div className="rounded-xl border bg-card"><div className="flex items-center justify-between border-b p-5"><div><h2 className="font-semibold">Upcoming events</h2><p className="mt-1 text-xs text-muted-foreground">Keep an eye on what&apos;s next</p></div><button onClick={() => setActive('Events')} className="text-xs font-medium text-primary hover:underline">View all</button></div><div className="p-2">{events.map((event) => <button onClick={() => notify(`${event.title} selected`)} key={event.title} className="flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-muted"><div className={`grid size-12 shrink-0 place-items-center rounded-lg ${event.color === 'indigo' ? 'bg-primary/10 text-primary' : event.color === 'blue' ? 'bg-blue-500/10 text-blue-600' : 'bg-muted text-muted-foreground'}`}><div className="text-center"><p className="text-[10px] font-bold">{event.month}</p><p className="text-lg font-semibold leading-5">{event.day}</p></div></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-medium">{event.title}</p><p className="mt-1 flex items-center gap-1 truncate text-xs text-muted-foreground"><event.icon size={13} />{event.place}</p></div><span className="whitespace-nowrap rounded-md bg-muted px-2 py-1 text-[11px] text-muted-foreground">{event.regs}</span></button>)}</div></div></section>
        <section className="mt-6 overflow-hidden rounded-xl border bg-card"><div className="flex flex-col gap-3 border-b p-5 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="font-semibold">Recent registrations</h2><p className="mt-1 text-xs text-muted-foreground">The latest attendees across your events</p></div><div className="relative sm:hidden"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search attendees" className="h-9 w-full rounded-lg border bg-background pl-9 pr-3 text-sm" /></div></div><div className="overflow-x-auto"><table className="w-full min-w-[680px] text-left text-sm"><thead className="bg-muted/40 text-xs text-muted-foreground"><tr><th className="px-5 py-3 font-medium">Attendee</th><th className="px-5 py-3 font-medium">Event</th><th className="px-5 py-3 font-medium">Date registered</th><th className="px-5 py-3 font-medium">Status</th><th className="px-5 py-3" /></tr></thead><tbody>{filtered.map((item) => <tr key={item.name} className="border-t hover:bg-muted/30"><td className="px-5 py-4"><div className="flex items-center gap-3"><div className="grid size-9 place-items-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{item.initials}</div><div><p className="font-medium">{item.name}</p><p className="text-xs text-muted-foreground">{item.detail}</p></div></div></td><td className="px-5 py-4">{item.event}</td><td className="px-5 py-4 text-muted-foreground">{item.date}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${item.tone === 'success' ? 'bg-emerald-500/10 text-emerald-700' : 'bg-amber-500/10 text-amber-700'}`}>{item.status}</span></td><td className="px-5 py-4 text-right"><button onClick={() => notify(`${item.name}'s registration menu opened`)} aria-label={`More actions for ${item.name}`} className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"><MoreHorizontal size={17} /></button></td></tr>)}</tbody></table></div><div className="border-t p-3 text-center"><button onClick={() => notify('All registrations opened')} className="text-sm font-medium text-primary hover:underline">View all registrations</button></div></section>
      </main></div>{toast && <div role="status" className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-lg bg-foreground px-4 py-3 text-sm text-background shadow-lg"><CheckCircle2 size={16} />{toast}</div>}
  </div>
}

function Stat({ icon: Icon, label, value, change }: { icon: typeof Users; label: string; value: string; change: string }) { return <div className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-md"><div className="mb-5 flex items-start justify-between"><div className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary"><Icon size={19} /></div><span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[11px] font-semibold text-emerald-700"><TrendingUp size={12} />{change}</span></div><p className="text-sm text-muted-foreground">{label}</p><p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p></div> }
