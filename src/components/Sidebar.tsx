import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Users, Database, Settings, LogOut, CreditCard, X } from 'lucide-react';
import { useAuthStore } from '@/features/auth/authStore';

const sidebarItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: Database, label: 'Lead Generator', href: '/lead-gen' },
    { icon: CreditCard, label: 'Payments', href: '/lead-gen/payment-history' },
    { icon: Users, label: 'Admin', href: '/admin', adminOnly: true },
    { icon: Settings, label: 'Profile', href: '/profile' },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const location = useLocation();
    const { user, logout } = useAuthStore();

    return (
        <>
            {/* Mobile backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div
                className={cn(
                    "fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r bg-card text-card-foreground transition-transform duration-300 ease-in-out",
                    // On mobile: slide in/out
                    isOpen ? "translate-x-0" : "-translate-x-full",
                    // On desktop: always visible
                    "lg:translate-x-0"
                )}
            >
                <div className="flex items-center justify-between p-6">
                    <h2 className="text-2xl font-bold tracking-tight text-primary">LeadsPro</h2>
                    <button
                        onClick={onClose}
                        className="lg:hidden rounded-md p-1 hover:bg-accent"
                    >
                        <X className="h-5 w-5" />
                    </button>
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
                                onClick={onClose}
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
        </>
    );
}
