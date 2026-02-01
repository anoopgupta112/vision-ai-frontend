import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getCredits } from '@/features/lead-gen/api/creditsApi';
import Sidebar from './Sidebar';
import { useAuthStore } from '@/features/auth/authStore';

export default function Layout({ children }: { children: React.ReactNode }) {
    const { user } = useAuthStore();

    // Fetch credits only if user is logged in
    const { data: creditsData } = useQuery({
        queryKey: ['credits'],
        queryFn: getCredits,
        enabled: !!user,
    });

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar />
            <div className="flex flex-1 flex-col">
                <header className="flex h-16 items-center border-b px-6 justify-between bg-card text-card-foreground">
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        {user && (
                            <div className="text-sm font-medium">
                                Credits: <span className="text-primary">{creditsData?.balance ?? user.credits ?? 0}</span>
                            </div>
                        )}
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {user?.email?.[0].toUpperCase()}
                        </div>
                    </div>
                </header>
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
