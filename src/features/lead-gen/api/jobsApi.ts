import api from '@/lib/axios';

export interface Job {
    id: string;
    query_text: string;
    leads_requested: number;
    leads_delivered: number;
    status: 'queued' | 'running' | 'done' | 'failed';
    error_message?: string;
    created_at: string;
    finished_at?: string;
}

export interface CreateJobParams {
    keyword: string;
    location: string;
    limit: number;
}

export const getJobs = async () => {
    const response = await api.get('/lead_gen/jobs');
    return response.data.jobs;
};

export const getJob = async (id: string) => {
    const response = await api.get(`/lead_gen/jobs/${id}`);
    return response.data.job;
};

export const createJob = async (data: CreateJobParams) => {
    // Backend expects 'query' field, not keyword/location
    const payload = {
        query: `${data.keyword} in ${data.location}`,
        limit: data.limit
    };
    const response = await api.post('/lead_gen/jobs', payload);
    return response.data;
};

export const cancelJob = async (id: string) => {
    const response = await api.delete(`/lead_gen/jobs/${id}`);
    return response.data;
};

export const getJobLeads = async (id: string) => {
    const response = await api.get(`/lead_gen/leads/job/${id}`);
    return response.data.leads;
};
