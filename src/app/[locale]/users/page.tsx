"use client";

import { Header } from "@/components/shared/header";
import { UserList } from "@/features/users/components/user-list";
import { UserFilters } from "@/features/users/components/user-filters";
import { UserStats } from "@/features/users/components/user-stats";
import { Button } from "@/components/ui/button";
import { Plus, Users as UsersIcon } from "lucide-react";
import { useUserStore } from "@/stores/user-store";

export default function UsersPage() {
  const selectedUser = useUserStore((state) => state.selectedUser);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      {/* Users Section */}
      <section className="container py-12 md:py-24 px-12">
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <UsersIcon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">
                User Management
              </h1>
              <p className="text-muted-foreground">
                Manage users with TanStack Query & Zustand
              </p>
            </div>
          </div>
          <Button size="lg">
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>

        {selectedUser && (
          <div className="mb-6 p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium">
              Selected User:{" "}
              <span className="text-primary">{selectedUser.name}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              This demonstrates Zustand state management
            </p>
          </div>
        )}

        <UserStats />
        <UserFilters />
        <UserList />
      </section>
    </div>
  );
}
