import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { getPackages, createOrder, verifyPayment, type CreditPackage, type OrderDetails } from '../api/paymentsApi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CreditCard, Sparkles, Zap, Rocket, Building2 } from 'lucide-react';

// Razorpay types
declare global {
    interface Window {
        Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
    }
}

interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;
    handler: (response: RazorpayResponse) => void;
    prefill?: {
        name?: string;
        email?: string;
    };
    theme?: {
        color?: string;
    };
    modal?: {
        ondismiss?: () => void;
    };
}

interface RazorpayInstance {
    open: () => void;
    close: () => void;
}

interface RazorpayResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

// Package icons mapping
const packageIcons: Record<string, React.ReactNode> = {
    starter: <Sparkles className="h-8 w-8 text-blue-500" />,
    basic: <Zap className="h-8 w-8 text-green-500" />,
    pro: <Rocket className="h-8 w-8 text-purple-500" />,
    enterprise: <Building2 className="h-8 w-8 text-orange-500" />
};

// Package colors
const packageColors: Record<string, string> = {
    starter: 'border-blue-200 hover:border-blue-400',
    basic: 'border-green-200 hover:border-green-400',
    pro: 'border-purple-200 hover:border-purple-400 ring-2 ring-purple-100',
    enterprise: 'border-orange-200 hover:border-orange-400'
};

export default function BuyCreditsPage() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [processingPackage, setProcessingPackage] = useState<string | null>(null);

    const { data: packages, isLoading } = useQuery({
        queryKey: ['credit-packages'],
        queryFn: getPackages
    });

    const createOrderMutation = useMutation({
        mutationFn: createOrder,
        onError: () => {
            toast.error('Failed to create order');
            setProcessingPackage(null);
        }
    });

    const verifyPaymentMutation = useMutation({
        mutationFn: verifyPayment,
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ['credits'] });
            setProcessingPackage(null);
            navigate(`/lead-gen/payment/status?status=success&credits=${data.credits_added}&order_id=${variables.razorpay_order_id}`);
        },
        onError: (_, variables) => {
            setProcessingPackage(null);
            navigate(`/lead-gen/payment/status?status=failed&order_id=${variables.razorpay_order_id}`);
        }
    });

    const loadRazorpayScript = (): Promise<boolean> => {
        return new Promise((resolve) => {
            if (window.Razorpay) {
                resolve(true);
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handleBuyCredits = async (pkg: CreditPackage) => {
        setProcessingPackage(pkg.id);

        // Load Razorpay SDK
        const loaded = await loadRazorpayScript();
        if (!loaded) {
            toast.error('Failed to load payment gateway');
            setProcessingPackage(null);
            return;
        }

        try {
            // Create order
            const orderDetails: OrderDetails = await createOrderMutation.mutateAsync(pkg.id);

            // Open Razorpay checkout
            const options: RazorpayOptions = {
                key: orderDetails.key_id,
                amount: orderDetails.amount,
                currency: orderDetails.currency,
                name: 'Lead Gen Credits',
                description: `${orderDetails.package.name} - ${orderDetails.package.credits} Credits`,
                order_id: orderDetails.order_id,
                handler: async (response: RazorpayResponse) => {
                    // Verify payment
                    await verifyPaymentMutation.mutateAsync({
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature
                    });
                },
                theme: {
                    color: '#6366f1'
                },
                modal: {
                    ondismiss: () => {
                        setProcessingPackage(null);
                    }
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            // Error already handled by mutation
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">Buy Credits</h1>
                <p className="text-muted-foreground">
                    Choose a credit package to power your lead generation
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {packages?.map((pkg) => (
                    <Card
                        key={pkg.id}
                        className={`relative transition-all duration-200 ${packageColors[pkg.id] || 'border-gray-200'}`}
                    >
                        {pkg.id === 'pro' && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-xs px-3 py-1 rounded-full">
                                Most Popular
                            </div>
                        )}
                        <CardHeader className="text-center pb-2">
                            <div className="mx-auto mb-2">
                                {packageIcons[pkg.id] || <CreditCard className="h-8 w-8" />}
                            </div>
                            <CardTitle className="text-xl">{pkg.name}</CardTitle>
                            <CardDescription>
                                {pkg.credits.toLocaleString()} Credits
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center space-y-4">
                            <div>
                                <span className="text-3xl font-bold">{pkg.display_amount}</span>
                                <p className="text-sm text-muted-foreground">
                                    ₹{(pkg.amount / pkg.credits / 100).toFixed(2)} per credit
                                </p>
                            </div>
                            <Button
                                className="w-full"
                                variant={pkg.id === 'pro' ? 'default' : 'outline'}
                                onClick={() => handleBuyCredits(pkg)}
                                disabled={processingPackage !== null}
                            >
                                {processingPackage === pkg.id ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        Buy Now
                                    </>
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="bg-muted/50">
                <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <CreditCard className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="font-semibold mb-1">Secure Payments</h3>
                            <p className="text-sm text-muted-foreground">
                                All payments are processed securely through Razorpay.
                                We support UPI, Credit/Debit Cards, Net Banking, and Wallets.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
