'use client'

import { useUsers } from '../hooks/use-users'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Building2, Mail, TrendingUp } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export function UserStats() {
  const { data: users, isLoading } = useUsers()

  const stats = {
    totalUsers: users?.length || 0,
    totalCompanies: new Set(users?.map((u) => u.company.name)).size || 0,
    totalEmails: users?.length || 0,
    avgNameLength:
      (users && users.length > 0
        ? users.reduce((acc, u) => acc + u.name.length, 0) / users.length
        : 0) || 0,
  }

  if (isLoading) {
    return (
      <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[120px] rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalUsers}</div>
          <p className="text-muted-foreground text-xs">Active users</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Companies</CardTitle>
          <Building2 className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalCompanies}</div>
          <p className="text-muted-foreground text-xs">Unique companies</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Email Accounts</CardTitle>
          <Mail className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalEmails}</div>
          <p className="text-muted-foreground text-xs">Registered emails</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Avg Name Length</CardTitle>
          <TrendingUp className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats.avgNameLength.toFixed(1)}
          </div>
          <p className="text-muted-foreground text-xs">Characters</p>
        </CardContent>
      </Card>
    </div>
  )
}
