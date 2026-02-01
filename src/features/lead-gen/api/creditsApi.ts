import api from '@/lib/axios';

export const getCredits = async () => {
    const response = await api.get('/lead_gen/credits');
    return response.data; // Assuming { balance: number } or similar
};

export const getCreditsHistory = async () => {
    const response = await api.get('/lead_gen/credits/history');
    return response.data.history;
};
