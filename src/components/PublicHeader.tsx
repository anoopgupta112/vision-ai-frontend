import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Zap, Menu, X } from 'lucide-react';

export default function PublicHeader() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="px-4 sm:px-6 h-16 flex items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <Link to="/" className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold tracking-tight">LeadsPro</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden sm:flex items-center gap-4">
                <Link to="/auth/login">
                    <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/auth/register">
                    <Button>Get Started</Button>
                </Link>
            </nav>

            {/* Mobile hamburger */}
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="sm:hidden rounded-md p-2 hover:bg-accent"
            >
                {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Mobile dropdown menu */}
            {menuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-background border-b shadow-lg sm:hidden z-50">
                    <nav className="flex flex-col p-4 gap-2">
                        <Link to="/auth/login" onClick={() => setMenuOpen(false)}>
                            <Button variant="ghost" className="w-full justify-start">Login</Button>
                        </Link>
                        <Link to="/auth/register" onClick={() => setMenuOpen(false)}>
                            <Button className="w-full">Get Started</Button>
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
