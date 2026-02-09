import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, Database, Settings, LogOut, CreditCard } from 'lucide-react';
import { useAuthStore } from '@/features/auth/authStore';

const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Database, label: 'Lead Generator', href: '/lead-gen' },
    { icon: CreditCard, label: 'Payments', href: '/lead-gen/payment-history' },
    { icon: Users, label: 'Admin', href: '/admin', adminOnly: true },
    { icon: Settings, label: 'Profile', href: '/profile' },
];

export default function Sidebar() {
    const location = useLocation();
    const { user, logout } = useAuthStore();

    return (
        <div className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r bg-card text-card-foreground">
            <div className="p-6">
                <h2 className="text-2xl font-bold tracking-tight text-primary">LeadsPro</h2>
            </div>
            <nav className="flex-1 space-y-1 px-4">
                {sidebarItems.map((item) => {
                    if (item.adminOnly && !user?.is_admin) return null;
                    const Icon = item.icon;
                    const isActive = location.pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            to={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                                isActive ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t">
                <button
                    onClick={logout}
                    className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </div>
    );
}
