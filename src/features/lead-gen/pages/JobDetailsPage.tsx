import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getJob } from '../api/jobsApi';
import LeadsTable from '../components/LeadsTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function JobDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const { data: job, isLoading } = useQuery({
        queryKey: ['job', id],
        queryFn: () => getJob(id!),
        enabled: !!id,
    });

    if (isLoading) return <div>Loading job details...</div>;
    if (!job) return <div>Job not found</div>;

    // Helper to get status badge color
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'done':
                return 'bg-green-100 text-green-800';
            case 'failed':
                return 'bg-red-100 text-red-800';
            case 'running':
                return 'bg-blue-100 text-blue-800';
            case 'queued':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6 overflow-hidden">
            <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Job Details</h2>
                <p className="text-muted-foreground text-sm sm:text-base truncate">Viewing details for job {id}</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Query</p>
                        <p className="text-lg">{job.query_text || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Leads Requested</p>
                        <p className="text-lg">{job.leads_requested || 0}</p>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Status</p>
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(job.status)}`}>
                            {job.status}
                        </span>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">Leads Delivered</p>
                        <p className="text-lg">{job.leads_delivered || 0}</p>
                    </div>
                </CardContent>
            </Card>

            <LeadsTable jobId={id!} />
        </div>
    );
}
