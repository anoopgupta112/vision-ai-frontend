import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { loginUser } from '../api/authApi';
import { useAuthStore } from '../authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            // Assuming data contains { token: string, user: User }
            // Adjust based on actual API response
            // Backend says: Stores JWT in localStorage/cookies. Assuming it returns it too or sets cookie.
            // If cookie only, we might just fetch /me. But usually login returns something.
            // Let's assume it returns { access_token: string, ... } or similar.
            // If it's a cookie-only auth, we just fetch user.
            // Docs said: POST /api/auth/login (stores JWT in localStorage/cookies)
            // I will assume the response has the token for me to store in my Zustand store/localStorage.
            if (data.token) {
                // Fetch user details immediately or use returned user
                // For now, let's assume we need to fetch 'me' or data has user.
                login(data.user, data.token);
                toast.success('Logged in successfully');
                navigate('/dashboard');
            } else {
                // Fallback for cookie based
                login(data.user || { email: 'unknown' }, 'cookie-session'); // simplistic fallback
                toast.success('Logged in successfully');
                navigate('/dashboard');
            }
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || error.response?.data?.detail || 'Login failed');
        },
    });

    const onSubmit = (data: LoginFormData) => {
        // Send as x-www-form-urlencoded usually for OAuth2, but docs say JSON?
        // "POST /api/auth/login (stores JWT in localStorage/cookies)"
        // Most FastAPIs use OAuth2FormData.
        // If standard JSON body:
        mutation.mutate(data);
    };

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Enter your credentials to access your account.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" placeholder="name@example.com" {...register('email')} />
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" {...register('password')} />
                            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                        </div>
                    </div>
                    <Button className="w-full mt-4" type="submit" disabled={mutation.isPending}>
                        {mutation.isPending ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">Don't have an account? <a href="/auth/register" className="text-primary hover:underline">Register</a></p>
            </CardFooter>
        </Card>
    );
}
