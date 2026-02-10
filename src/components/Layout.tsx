import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCredits } from '@/features/lead-gen/api/creditsApi';
import Sidebar from './Sidebar';
import { useAuthStore } from '@/features/auth/authStore';
import { Button } from '@/components/ui/button';
import { CreditCard, Menu } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
    const { user } = useAuthStore();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Fetch credits only if user is logged in
    const { data: creditsData } = useQuery({
        queryKey: ['credits'],
        queryFn: getCredits,
        enabled: !!user,
    });

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex flex-1 flex-col lg:ml-64">
                <header className="flex h-16 items-center border-b px-4 sm:px-6 justify-between bg-card text-card-foreground">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden rounded-md p-2 hover:bg-accent"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                        <h1 className="text-lg sm:text-xl font-semibold">Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                        {user && (
                            <>
                                <div className="text-xs sm:text-sm font-medium">
                                    Credits: <span className="text-primary">{creditsData?.balance ?? user.credits ?? 0}</span>
                                </div>
                                <Link to="/lead-gen/buy-credits">
                                    <Button size="sm" variant="outline" className="gap-2 hidden sm:inline-flex">
                                        <CreditCard className="h-4 w-4" />
                                        Buy Credits
                                    </Button>
                                    <Button size="icon" variant="outline" className="sm:hidden h-8 w-8">
                                        <CreditCard className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </>
                        )}
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                            {user?.email?.[0].toUpperCase()}
                        </div>
                    </div>
                </header>
                <main className="flex-1 p-4 sm:p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    )
}
