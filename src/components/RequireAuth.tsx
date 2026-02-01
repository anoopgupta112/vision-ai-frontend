import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/authStore';

export default function RequireAuth({ children, adminOnly = false }: { children: JSX.Element, adminOnly?: boolean }) {
    const { isAuthenticated, user } = useAuthStore();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    if (adminOnly && !user?.is_admin) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
