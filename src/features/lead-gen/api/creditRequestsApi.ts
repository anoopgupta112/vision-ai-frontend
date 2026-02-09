import api from '@/lib/axios';

export interface CreditRequest {
    id: string;
    user_id: string;
    user_email: string | null;
    amount: number;
    reason: string | null;
    status: 'pending' | 'approved' | 'rejected';
    admin_note: string | null;
    created_at: string;
    processed_at: string | null;
}

export const requestCredits = async (reason?: string) => {
    const response = await api.post('/lead_gen/credits/request', { reason });
    return response.data;
};

export const getMyRequests = async (): Promise<CreditRequest[]> => {
    const response = await api.get('/lead_gen/credits/requests');
    return response.data.requests;
};

// Admin endpoints
export const getCreditRequests = async (): Promise<{ requests: CreditRequest[]; pending_count: number }> => {
    const response = await api.get('/admin/credit-requests');
    return response.data;
};

export const approveRequest = async (requestId: string, note?: string) => {
    const response = await api.post(`/admin/credit-requests/${requestId}/approve`, { note });
    return response.data;
};

export const rejectRequest = async (requestId: string, note?: string) => {
    const response = await api.post(`/admin/credit-requests/${requestId}/reject`, { note });
    return response.data;
};
