import api from '@/lib/axios';

export interface CreditPackage {
    id: string;
    name: string;
    credits: number;
    amount: number;
    display_amount: string;
}

export interface OrderDetails {
    order_id: string;
    amount: number;
    currency: string;
    key_id: string;
    package: {
        id: string;
        name: string;
        credits: number;
    };
}

export interface PaymentVerification {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

export interface PaymentTransaction {
    id: string;
    order_id: string;
    payment_id: string | null;
    package_id: string;
    amount: number;
    display_amount: string;
    credits: number;
    status: 'pending' | 'success' | 'failed';
    created_at: string;
}

export const getPackages = async (): Promise<CreditPackage[]> => {
    const response = await api.get('/payments/packages');
    return response.data.packages;
};

export const createOrder = async (packageId: string): Promise<OrderDetails> => {
    const response = await api.post('/payments/create-order', { package_id: packageId });
    return response.data;
};

export const verifyPayment = async (data: PaymentVerification) => {
    const response = await api.post('/payments/verify', data);
    return response.data;
};

export const getPaymentHistory = async (): Promise<PaymentTransaction[]> => {
    const response = await api.get('/payments/history');
    return response.data.transactions;
};
