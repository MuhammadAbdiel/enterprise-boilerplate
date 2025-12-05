'use client'

import { User } from '../types'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Phone, Globe, Trash2, Edit } from 'lucide-react'
import { useUserStore } from '@/stores/user-store'

interface UserCardProps {
  user: User
  onDelete: () => void
}

export function UserCard({ user, onDelete }: UserCardProps) {
  const setSelectedUser = useUserStore((state) => state.setSelectedUser)

  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl">{user.name}</CardTitle>
            <CardDescription>@{user.username}</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedUser(user)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <Trash2 className="text-destructive h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4" />
          <span>{user.email}</span>
        </div>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4" />
          <span>{user.phone}</span>
        </div>
        <div className="text-muted-foreground flex items-center gap-2 text-sm">
          <Globe className="h-4 w-4" />
          <span>{user.website}</span>
        </div>
        <div className="mt-4 border-t pt-4">
          <p className="text-sm font-medium">Company</p>
          <p className="text-muted-foreground text-sm">{user.company.name}</p>
        </div>
      </CardContent>
    </Card>
  )
}
