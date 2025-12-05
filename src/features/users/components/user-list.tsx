"use client";

import { useUsers, useDeleteUser } from "../hooks/use-users";
import { UserCard } from "./user-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { useFilterStore } from "@/stores/filter-store";
import { useMemo } from "react";

export function UserList() {
  const { data: users, isLoading, error } = useUsers();
  const deleteUserMutation = useDeleteUser();
  const { searchQuery, sortBy, sortOrder } = useFilterStore();

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(id);
    }
  };

  // Filter and sort users based on Zustand store state
  const filteredAndSortedUsers = useMemo(() => {
    if (!users) return [];

    let filtered = users.filter((user) => {
      const query = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.company.name.toLowerCase().includes(query)
      );
    });

    // Sort users
    filtered.sort((a, b) => {
      let aValue = "";
      let bValue = "";

      if (sortBy === "name") {
        aValue = a.name;
        bValue = b.name;
      } else if (sortBy === "email") {
        aValue = a.email;
        bValue = b.email;
      } else if (sortBy === "company") {
        aValue = a.company.name;
        bValue = b.company.name;
      }

      const comparison = aValue.localeCompare(bValue);
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return filtered;
  }, [users, searchQuery, sortBy, sortOrder]);

  if (isLoading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[280px] w-full rounded-xl" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Error loading users: {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  if (filteredAndSortedUsers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No users found</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredAndSortedUsers.map((user) => (
        <UserCard key={user.id} user={user} onDelete={handleDelete} />
      ))}
    </div>
  );
}
