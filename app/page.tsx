import { EventDashboard } from '@/components/event-dashboard'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function Page() {
  const { data: { user } } = await (await createClient()).auth.getUser()
  if (!user) redirect('/auth/login')
  return <EventDashboard userEmail={user.email ?? ''} />
}
