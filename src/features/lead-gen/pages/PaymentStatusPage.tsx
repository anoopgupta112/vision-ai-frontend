import { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Loader2, Home, RotateCcw, CreditCard } from 'lucide-react';

type PaymentStatus = 'success' | 'failed' | 'pending';

export default function PaymentStatusPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    const status = (searchParams.get('status') as PaymentStatus) || 'pending';
    const orderId = searchParams.get('order_id');
    const credits = searchParams.get('credits');

    // Auto-redirect to dashboard after success
    useEffect(() => {
        if (status === 'success') {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        navigate('/lead-gen');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [status, navigate]);

    const statusConfig = {
        success: {
            icon: CheckCircle2,
            iconColor: 'text-green-500',
            bgColor: 'bg-green-50',
            title: 'Payment Successful!',
            description: credits
                ? `${credits} credits have been added to your account.`
                : 'Your credits have been added to your account.',
        },
        failed: {
            icon: XCircle,
            iconColor: 'text-red-500',
            bgColor: 'bg-red-50',
            title: 'Payment Failed',
            description: 'Something went wrong with your payment. Please try again.',
        },
        pending: {
            icon: Loader2,
            iconColor: 'text-yellow-500',
            bgColor: 'bg-yellow-50',
            title: 'Processing Payment...',
            description: 'Please wait while we verify your payment.',
        },
    };

    const config = statusConfig[status];
    const StatusIcon = config.icon;

    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <Card className={`max-w-md w-full ${config.bgColor}`}>
                <CardContent className="pt-8 pb-8 text-center space-y-6">
                    <div className="flex justify-center">
                        <div className={`p-4 rounded-full ${status === 'success' ? 'bg-green-100' : status === 'failed' ? 'bg-red-100' : 'bg-yellow-100'}`}>
                            <StatusIcon
                                className={`h-16 w-16 ${config.iconColor} ${status === 'pending' ? 'animate-spin' : ''}`}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h1 className="text-2xl font-bold">{config.title}</h1>
                        <p className="text-muted-foreground">{config.description}</p>
                    </div>

                    {orderId && (
                        <div className="bg-white/50 rounded-lg p-3">
                            <p className="text-xs text-muted-foreground">Order ID</p>
                            <p className="font-mono text-sm">{orderId}</p>
                        </div>
                    )}

                    <div className="space-y-3 pt-4">
                        {status === 'success' && (
                            <>
                                <p className="text-sm text-muted-foreground">
                                    Redirecting to dashboard in {countdown}s...
                                </p>
                                <div className="flex gap-3 justify-center">
                                    <Link to="/lead-gen">
                                        <Button>
                                            <Home className="mr-2 h-4 w-4" />
                                            Go to Dashboard
                                        </Button>
                                    </Link>
                                    <Link to="/lead-gen/payment-history">
                                        <Button variant="outline">
                                            <CreditCard className="mr-2 h-4 w-4" />
                                            View History
                                        </Button>
                                    </Link>
                                </div>
                            </>
                        )}

                        {status === 'failed' && (
                            <div className="flex gap-3 justify-center">
                                <Link to="/lead-gen/buy-credits">
                                    <Button>
                                        <RotateCcw className="mr-2 h-4 w-4" />
                                        Try Again
                                    </Button>
                                </Link>
                                <Link to="/lead-gen">
                                    <Button variant="outline">
                                        <Home className="mr-2 h-4 w-4" />
                                        Go to Dashboard
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
