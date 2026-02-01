import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createJob } from '../api/jobsApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const jobSchema = z.object({
    keyword: z.string().min(2, 'Keyword is required'),
    location: z.string().min(2, 'Location is required'),
    limit: z.number().min(1).max(100),
});

type JobFormData = z.infer<typeof jobSchema>;

export default function CreateJobForm() {
    const queryClient = useQueryClient();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<JobFormData>({
        resolver: zodResolver(jobSchema),
        defaultValues: {
            limit: 10,
        }
    });

    const mutation = useMutation({
        mutationFn: createJob,
        onSuccess: () => {
            toast.success('Job started successfully');
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
            // Also invalidate credits as they might have been deducted
            queryClient.invalidateQueries({ queryKey: ['credits'] });
            reset();
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || error.response?.data?.detail || 'Failed to start job');
        },
    });

    const onSubmit = (data: JobFormData) => {
        mutation.mutate(data);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create New Job</CardTitle>
                <CardDescription>Start a new lead generation task.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="keyword">Keyword</Label>
                            <Input id="keyword" placeholder="e.g. Plumbers" {...register('keyword')} />
                            {errors.keyword && <p className="text-sm text-red-500">{errors.keyword.message}</p>}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" placeholder="e.g. New York, NY" {...register('location')} />
                            {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="limit">Limit</Label>
                            <Input id="limit" type="number" {...register('limit', { valueAsNumber: true })} />
                            {errors.limit && <p className="text-sm text-red-500">{errors.limit.message}</p>}
                        </div>
                    </div>

                    <Button type="submit" disabled={mutation.isPending}>
                        {mutation.isPending ? 'Starting...' : 'Start Job'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
