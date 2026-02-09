import api from '@/lib/axios';

export const loginUser = async (data: any) => {
    const response = await api.post('/auth/login', data);
    return response.data;
};

export const registerUser = async (data: any) => {
    const response = await api.post('/auth/register', data);
    return response.data;
};

export const verifyOtp = async (data: { email: string; code: string }) => {
    const response = await api.post('/auth/verify-otp', data);
    return response.data;
};

export const resendOtp = async (email: string) => {
    const response = await api.post('/auth/resend-otp', { email });
    return response.data;
};

export const getMe = async () => {
    const response = await api.get('/auth/me');
    return response.data;
};

export const updateProfile = async (data: any) => {
    const response = await api.put('/auth/profile', data);
    return response.data;
};
