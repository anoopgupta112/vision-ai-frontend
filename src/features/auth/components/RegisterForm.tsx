import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { registerUser, verifyOtp, resendOtp } from '../api/authApi';
import { useAuthStore } from '../authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Mail, Phone, Lock, ArrowLeft } from 'lucide-react';

const registerSchema = z.object({
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits').optional().or(z.literal('')),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

const otpSchema = z.object({
    code: z.string().length(6, 'OTP must be 6 digits'),
});

type RegisterFormData = z.infer<typeof registerSchema>;
type OtpFormData = z.infer<typeof otpSchema>;

export default function RegisterForm() {
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const [step, setStep] = useState<'register' | 'verify'>('register');
    const [email, setEmail] = useState('');
    const [resendCooldown, setResendCooldown] = useState(0);

    const registerForm = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const otpForm = useForm<OtpFormData>({
        resolver: zodResolver(otpSchema),
    });

    const registerMutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            setEmail(data.email);
            setStep('verify');
            toast.success('OTP sent to your email');
            startResendCooldown();
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Registration failed');
        },
    });

    const verifyMutation = useMutation({
        mutationFn: verifyOtp,
        onSuccess: (data) => {
            login(data.user, data.token);
            toast.success('Email verified! Welcome!');
            navigate('/dashboard');
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Invalid OTP');
        },
    });

    const resendMutation = useMutation({
        mutationFn: resendOtp,
        onSuccess: () => {
            toast.success('OTP resent to your email');
            startResendCooldown();
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Failed to resend OTP');
        },
    });

    const startResendCooldown = () => {
        setResendCooldown(60);
        const interval = setInterval(() => {
            setResendCooldown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const onRegisterSubmit = (data: RegisterFormData) => {
        const { confirmPassword, ...apiData } = data;
        registerMutation.mutate(apiData);
    };

    const onOtpSubmit = (data: OtpFormData) => {
        verifyMutation.mutate({ email, code: data.code });
    };

    if (step === 'verify') {
        return (
            <Card className="w-[400px]">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setStep('register')}
                            className="h-8 w-8"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <CardTitle>Verify Email</CardTitle>
                            <CardDescription>Enter the 6-digit OTP sent to {email}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <form onSubmit={otpForm.handleSubmit(onOtpSubmit)} autoComplete="off">
                        {/* Hidden fields to absorb autofill */}
                        <input type="email" name="prevent-autofill-email" style={{ display: 'none' }} tabIndex={-1} />
                        <input type="password" name="prevent-autofill-pass" style={{ display: 'none' }} tabIndex={-1} />
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="otp-code-input">OTP Code</Label>
                                <Input
                                    id="otp-code-input"
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    placeholder="000000"
                                    maxLength={6}
                                    autoComplete="off"
                                    autoCorrect="off"
                                    autoCapitalize="off"
                                    spellCheck={false}
                                    data-lpignore="true"
                                    data-form-type="other"
                                    className="text-center text-2xl tracking-widest"
                                    {...otpForm.register('code')}
                                />
                                {otpForm.formState.errors.code && (
                                    <p className="text-sm text-red-500">{otpForm.formState.errors.code.message}</p>
                                )}
                            </div>
                        </div>
                        <Button className="w-full mt-4" type="submit" disabled={verifyMutation.isPending}>
                            {verifyMutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Verifying...
                                </>
                            ) : (
                                'Verify Email'
                            )}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Button
                        variant="link"
                        onClick={() => resendMutation.mutate(email)}
                        disabled={resendCooldown > 0 || resendMutation.isPending}
                    >
                        {resendMutation.isPending ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : 'Resend OTP'}
                    </Button>
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card className="w-[400px]">
            <CardHeader>
                <CardTitle>Create Account</CardTitle>
                <CardDescription>Enter your details to get started.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail className="h-4 w-4" /> Email
                            </Label>
                            <Input id="email" placeholder="name@example.com" {...registerForm.register('email')} />
                            {registerForm.formState.errors.email && (
                                <p className="text-sm text-red-500">{registerForm.formState.errors.email.message}</p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="phone" className="flex items-center gap-2">
                                <Phone className="h-4 w-4" /> Phone Number <span className="text-muted-foreground text-xs">(optional)</span>
                            </Label>
                            <Input id="phone" placeholder="+91 9876543210" {...registerForm.register('phone')} />
                            {registerForm.formState.errors.phone && (
                                <p className="text-sm text-red-500">{registerForm.formState.errors.phone.message}</p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password" className="flex items-center gap-2">
                                <Lock className="h-4 w-4" /> Password
                            </Label>
                            <Input id="password" type="password" {...registerForm.register('password')} />
                            {registerForm.formState.errors.password && (
                                <p className="text-sm text-red-500">{registerForm.formState.errors.password.message}</p>
                            )}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="confirmPassword" className="flex items-center gap-2">
                                <Lock className="h-4 w-4" /> Confirm Password
                            </Label>
                            <Input id="confirmPassword" type="password" {...registerForm.register('confirmPassword')} />
                            {registerForm.formState.errors.confirmPassword && (
                                <p className="text-sm text-red-500">{registerForm.formState.errors.confirmPassword.message}</p>
                            )}
                        </div>
                    </div>
                    <Button className="w-full mt-4" type="submit" disabled={registerMutation.isPending}>
                        {registerMutation.isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Creating account...
                            </>
                        ) : (
                            'Create Account'
                        )}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center">
                <p className="text-sm text-muted-foreground">
                    Already have an account? <a href="/auth/login" className="text-primary hover:underline">Login</a>
                </p>
            </CardFooter>
        </Card>
    );
}
