import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getJobs, cancelJob } from '../api/jobsApi'; // Added cancelJob
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Job } from '../api/jobsApi';
import { toast } from 'sonner';

export default function JobsList() {
    const queryClient = useQueryClient();
    const { data: jobs, isLoading, error } = useQuery({
        queryKey: ['jobs'],
        queryFn: getJobs,
    });

    const cancelMutation = useMutation({
        mutationFn: cancelJob,
        onSuccess: () => {
            toast.success('Job cancelled');
            queryClient.invalidateQueries({ queryKey: ['jobs'] });
        },
        onError: () => toast.error('Failed to cancel job'),
    });

    if (isLoading) return <div>Loading jobs...</div>;
    if (error) return <div>Error loading jobs</div>;

    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Recent Jobs</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                <th className="h-10 sm:h-12 px-2 sm:px-4 text-left align-middle font-medium text-muted-foreground hidden sm:table-cell">Date</th>
                                <th className="h-10 sm:h-12 px-2 sm:px-4 text-left align-middle font-medium text-muted-foreground">Query</th>
                                <th className="h-10 sm:h-12 px-2 sm:px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                <th className="h-10 sm:h-12 px-2 sm:px-4 text-left align-middle font-medium text-muted-foreground">Leads</th>
                                <th className="h-10 sm:h-12 px-2 sm:px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {jobs?.map((job: Job) => (
                                <tr key={job.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <td className="p-2 sm:p-4 align-middle hidden sm:table-cell">{format(new Date(job.created_at), 'PPP')}</td>
                                    <td className="p-2 sm:p-4 align-middle">{job.query_text}</td>
                                    <td className="p-2 sm:p-4 align-middle">
                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold
                                    ${job.status === 'done' ? 'bg-green-100 text-green-800' :
                                                job.status === 'failed' ? 'bg-red-100 text-red-800' :
                                                    job.status === 'running' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {job.status}
                                        </span>
                                    </td>
                                    <td className="p-2 sm:p-4 align-middle">{job.leads_delivered}/{job.leads_requested}</td>
                                    <td className="p-2 sm:p-4 align-middle flex gap-1 sm:gap-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <a href={`/lead-gen/jobs/${job.id}`}>View</a>
                                        </Button>
                                        {job.status === 'queued' && (
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => cancelMutation.mutate(job.id)}
                                                disabled={cancelMutation.isPending}
                                            >Cancel</Button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {!jobs?.length && (
                                <tr>
                                    <td colSpan={5} className="p-4 text-center text-muted-foreground">No jobs found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
