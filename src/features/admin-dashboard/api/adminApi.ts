import api from '@/lib/axios';

export const getUsers = async () => {
    const response = await api.get('/admin/users');
    return response.data.users;
};

export const getStats = async () => {
    const response = await api.get('/admin/stats');
    return response.data.stats;
};

export const addCredits = async (userId: string, amount: number) => {
    const response = await api.post(`/admin/users/${userId}/credits`, { amount });
    return response.data;
};

export const updateUser = async (userId: string, data: any) => {
    const response = await api.put(`/admin/users/${userId}`, data);
    return response.data;
};

export const getAllJobs = async () => {
    const response = await api.get('/admin/jobs');
    return response.data.jobs;
};

export const deleteUser = async (userId: string) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
};
