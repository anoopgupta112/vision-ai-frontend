import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUsers, getStats, addCredits, getAllJobs } from '../api/adminApi';
import { getCreditRequests, approveRequest, rejectRequest, type CreditRequest } from '@/features/lead-gen/api/creditRequestsApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { ChevronDown, ChevronRight, CheckCircle2, XCircle, Loader2, Gift } from 'lucide-react';

export default function AdminPage() {
    const { data: users, isLoading: usersLoading } = useQuery({ queryKey: ['users'], queryFn: getUsers });
    const { data: stats, isLoading: statsLoading } = useQuery({ queryKey: ['stats'], queryFn: getStats });
    const { data: jobs, isLoading: jobsLoading } = useQuery({ queryKey: ['admin-jobs'], queryFn: getAllJobs });
    const { data: creditRequestsData, isLoading: requestsLoading } = useQuery({
        queryKey: ['credit-requests'],
        queryFn: getCreditRequests
    });

    // State for filters and collapsible errors
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [userFilter, setUserFilter] = useState<string>('');
    const [expandedErrors, setExpandedErrors] = useState<Set<string>>(new Set());
    const [creditAmount, setCreditAmount] = useState<{ [key: string]: number }>({});
    const [activeTab, setActiveTab] = useState<'users' | 'jobs' | 'credit-requests'>('users');

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: ({ userId, amount }: { userId: string, amount: number }) => addCredits(userId, amount),
        onSuccess: () => {
            toast.success('Credits added');
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: () => toast.error('Failed to add credits'),
    });

    const approveMutation = useMutation({
        mutationFn: ({ requestId, note }: { requestId: string; note?: string }) => approveRequest(requestId, note),
        onSuccess: () => {
            toast.success('Credit request approved and credits added');
            queryClient.invalidateQueries({ queryKey: ['credit-requests'] });
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
        onError: () => toast.error('Failed to approve request'),
    });

    const rejectMutation = useMutation({
        mutationFn: ({ requestId, note }: { requestId: string; note?: string }) => rejectRequest(requestId, note),
        onSuccess: () => {
            toast.success('Credit request rejected');
            queryClient.invalidateQueries({ queryKey: ['credit-requests'] });
        },
        onError: () => toast.error('Failed to reject request'),
    });

    const handleAddCredits = (userId: string) => {
        const amount = creditAmount[userId];
        if (amount) {
            mutation.mutate({ userId, amount });
        }
    };

    const toggleError = (jobId: string) => {
        setExpandedErrors(prev => {
            const newSet = new Set(prev);
            if (newSet.has(jobId)) {
                newSet.delete(jobId);
            } else {
                newSet.add(jobId);
            }
            return newSet;
        });
    };

    // Filter jobs
    const filteredJobs = useMemo(() => {
        if (!jobs) return [];
        return jobs.filter((job: any) => {
            const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
            const matchesUser = !userFilter || job.user_email.toLowerCase().includes(userFilter.toLowerCase());
            return matchesStatus && matchesUser;
        });
    }, [jobs, statusFilter, userFilter]);

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

    if (usersLoading || statsLoading) return <div>Loading admin dashboard...</div>;

    const pendingRequestsCount = creditRequestsData?.pending_count || 0;

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>

            <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.total_users || 0}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.total_jobs || 0}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats?.total_leads || 0}</div>
                    </CardContent>
                </Card>
                <Card className={pendingRequestsCount > 0 ? 'border-orange-300 bg-orange-50/50' : ''}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Gift className="h-4 w-4" />
                            Credit Requests
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingRequestsCount}</div>
                        <p className="text-xs text-muted-foreground">pending approval</p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 border-b pb-2">
                <Button
                    variant={activeTab === 'users' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('users')}
                >
                    Users
                </Button>
                <Button
                    variant={activeTab === 'jobs' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('jobs')}
                >
                    Jobs
                </Button>
                <Button
                    variant={activeTab === 'credit-requests' ? 'default' : 'ghost'}
                    onClick={() => setActiveTab('credit-requests')}
                    className="relative"
                >
                    Credit Requests
                    {pendingRequestsCount > 0 && (
                        <Badge variant="destructive" className="ml-2 h-5 min-w-5 justify-center">
                            {pendingRequestsCount}
                        </Badge>
                    )}
                </Button>
            </div>

            {/* Users Tab */}
            {activeTab === 'users' && (
                <Card>
                    <CardHeader>
                        <CardTitle>Users Management</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b">
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Email</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Admin</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Credits</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {users?.map((user: any) => (
                                        <tr key={user.id} className="border-b transition-colors hover:bg-muted/50">
                                            <td className="p-4 align-middle">{user.email}</td>
                                            <td className="p-4 align-middle">{user.is_admin ? 'Yes' : 'No'}</td>
                                            <td className="p-4 align-middle">{user.credits}</td>
                                            <td className="p-4 align-middle flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    className="w-20 h-8"
                                                    placeholder="Amt"
                                                    onChange={(e) => setCreditAmount(prev => ({ ...prev, [user.id]: parseInt(e.target.value) }))}
                                                />
                                                <Button size="sm" onClick={() => handleAddCredits(user.id)}>Add Credits</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Jobs Tab */}
            {activeTab === 'jobs' && (
                <Card>
                    <CardHeader>
                        <CardTitle>All Jobs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {jobsLoading ? (
                            <div>Loading jobs...</div>
                        ) : (
                            <div className="space-y-4">
                                {/* Filters */}
                                <div className="flex gap-2 items-center flex-wrap">
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant={statusFilter === 'all' ? 'default' : 'outline'}
                                            onClick={() => setStatusFilter('all')}
                                        >
                                            All
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant={statusFilter === 'queued' ? 'default' : 'outline'}
                                            onClick={() => setStatusFilter('queued')}
                                        >
                                            Queued
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant={statusFilter === 'running' ? 'default' : 'outline'}
                                            onClick={() => setStatusFilter('running')}
                                        >
                                            Running
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant={statusFilter === 'done' ? 'default' : 'outline'}
                                            onClick={() => setStatusFilter('done')}
                                        >
                                            Done
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant={statusFilter === 'failed' ? 'default' : 'outline'}
                                            onClick={() => setStatusFilter('failed')}
                                        >
                                            Failed
                                        </Button>
                                    </div>
                                    <Input
                                        placeholder="Filter by user email..."
                                        className="max-w-xs"
                                        value={userFilter}
                                        onChange={(e) => setUserFilter(e.target.value)}
                                    />
                                </div>

                                {/* Jobs Table */}
                                <div className="relative w-full overflow-auto max-h-[600px]">
                                    <table className="w-full caption-bottom text-sm">
                                        <thead className="[&_tr]:border-b sticky top-0 bg-white">
                                            <tr className="border-b">
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">User</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Query</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Leads</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Created</th>
                                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Error</th>
                                            </tr>
                                        </thead>
                                        <tbody className="[&_tr:last-child]:border-0">
                                            {filteredJobs?.map((job: any) => (
                                                <tr key={job.id} className="border-b transition-colors hover:bg-muted/50">
                                                    <td className="p-4 align-middle">{job.user_email}</td>
                                                    <td className="p-4 align-middle max-w-xs truncate">{job.query_text}</td>
                                                    <td className="p-4 align-middle">
                                                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(job.status)}`}>
                                                            {job.status}
                                                        </span>
                                                    </td>
                                                    <td className="p-4 align-middle">{job.leads_delivered}/{job.leads_requested}</td>
                                                    <td className="p-4 align-middle">{job.created_at ? format(new Date(job.created_at), 'PPp') : 'N/A'}</td>
                                                    <td className="p-4 align-middle">
                                                        {job.error_message ? (
                                                            <div className="flex items-start gap-2">
                                                                <Button
                                                                    size="sm"
                                                                    variant="ghost"
                                                                    className="h-6 w-6 p-0"
                                                                    onClick={() => toggleError(job.id)}
                                                                >
                                                                    {expandedErrors.has(job.id) ? (
                                                                        <ChevronDown className="h-4 w-4" />
                                                                    ) : (
                                                                        <ChevronRight className="h-4 w-4" />
                                                                    )}
                                                                </Button>
                                                                <div className="flex-1">
                                                                    {expandedErrors.has(job.id) ? (
                                                                        <span className="text-red-600 text-xs break-words">{job.error_message}</span>
                                                                    ) : (
                                                                        <span className="text-red-600 text-xs truncate block max-w-md">
                                                                            {job.error_message.substring(0, 50)}...
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <span className="text-muted-foreground">-</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                            {!filteredJobs?.length && (
                                                <tr>
                                                    <td colSpan={6} className="p-4 text-center text-muted-foreground">No jobs found.</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Credit Requests Tab */}
            {activeTab === 'credit-requests' && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Gift className="h-5 w-5" />
                            Pending Credit Requests
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {requestsLoading ? (
                            <div className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Loading requests...
                            </div>
                        ) : creditRequestsData?.requests?.length === 0 ? (
                            <div className="text-center py-8 text-muted-foreground">
                                <Gift className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                <p>No pending credit requests</p>
                            </div>
                        ) : (
                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm">
                                    <thead className="[&_tr]:border-b">
                                        <tr className="border-b">
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">User</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Amount</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Reason</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Requested</th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&_tr:last-child]:border-0">
                                        {creditRequestsData?.requests?.map((req: CreditRequest) => (
                                            <tr key={req.id} className="border-b transition-colors hover:bg-muted/50">
                                                <td className="p-4 align-middle">{req.user_email}</td>
                                                <td className="p-4 align-middle">
                                                    <Badge variant="secondary">{req.amount} credits</Badge>
                                                </td>
                                                <td className="p-4 align-middle text-muted-foreground">{req.reason || '-'}</td>
                                                <td className="p-4 align-middle">{req.created_at ? format(new Date(req.created_at), 'PPp') : 'N/A'}</td>
                                                <td className="p-4 align-middle">
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="default"
                                                            className="bg-green-600 hover:bg-green-700"
                                                            disabled={approveMutation.isPending || rejectMutation.isPending}
                                                            onClick={() => approveMutation.mutate({ requestId: req.id })}
                                                        >
                                                            {approveMutation.isPending ? (
                                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                            ) : (
                                                                <>
                                                                    <CheckCircle2 className="h-4 w-4 mr-1" />
                                                                    Approve
                                                                </>
                                                            )}
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="destructive"
                                                            disabled={approveMutation.isPending || rejectMutation.isPending}
                                                            onClick={() => rejectMutation.mutate({ requestId: req.id })}
                                                        >
                                                            {rejectMutation.isPending ? (
                                                                <Loader2 className="h-4 w-4 animate-spin" />
                                                            ) : (
                                                                <>
                                                                    <XCircle className="h-4 w-4 mr-1" />
                                                                    Reject
                                                                </>
                                                            )}
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
