import { EventDashboard } from '@/components/event-dashboard'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')
  const { data: profile } = await supabase.from('ep_users').select('role').eq('id', user.id).maybeSingle()
  return <EventDashboard userEmail={user.email ?? ''} userId={user.id} role={(profile?.role as 'ADMIN' | 'COORDINATOR' | 'STUDENT') ?? 'STUDENT'} />
}
