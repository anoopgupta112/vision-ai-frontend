import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { requestCredits, getMyRequests as getMyRequestsApi } from '../api/creditRequestsApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Gift, Loader2, Clock, CheckCircle2, XCircle } from 'lucide-react';

const statusConfig = {
    pending: { label: 'Pending', icon: Clock, variant: 'secondary' as const },
    approved: { label: 'Approved', icon: CheckCircle2, variant: 'default' as const },
    rejected: { label: 'Rejected', icon: XCircle, variant: 'destructive' as const },
};

export default function RequestCreditsCard() {
    const queryClient = useQueryClient();
    const [hasRequested, setHasRequested] = useState(false);

    const { data: requests, isLoading } = useQuery({
        queryKey: ['my-credit-requests'],
        queryFn: getMyRequestsApi,
    });

    const requestMutation = useMutation({
        mutationFn: requestCredits,
        onSuccess: () => {
            toast.success('Credit request submitted! Waiting for admin approval.');
            setHasRequested(true);
            queryClient.invalidateQueries({ queryKey: ['my-credit-requests'] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || 'Failed to submit request');
        },
    });

    const pendingRequest = requests?.find(r => r.status === 'pending');
    const approvedRequest = requests?.find(r => r.status === 'approved');
    const hasPending = !!pendingRequest;
    const hasApproved = !!approvedRequest;

    if (isLoading) {
        return null;
    }

    // Don't show the card at all if user already got free credits
    if (hasApproved && !hasPending) {
        return null;
    }

    return (
        <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/20 dark:to-indigo-950/20 border-purple-200 dark:border-purple-800">
            <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                    <Gift className="h-5 w-5 text-purple-600" />
                    <CardTitle className="text-lg">Free Credits</CardTitle>
                </div>
                <CardDescription>
                    Request 50 free credits to get started
                </CardDescription>
            </CardHeader>
            <CardContent>
                {hasPending ? (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 animate-pulse" />
                        <span>Your request for 50 credits is pending approval</span>
                    </div>
                ) : (
                    <Button
                        onClick={() => requestMutation.mutate('First-time credit request')}
                        disabled={requestMutation.isPending || hasRequested}
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    >
                        {requestMutation.isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Requesting...
                            </>
                        ) : (
                            <>
                                <Gift className="mr-2 h-4 w-4" />
                                Request 50 Free Credits
                            </>
                        )}
                    </Button>
                )}

                {requests && requests.length > 0 && (
                    <div className="mt-4 space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">Recent Requests</p>
                        {requests.slice(0, 3).map((req) => {
                            const config = statusConfig[req.status];
                            const StatusIcon = config.icon;
                            return (
                                <div key={req.id} className="flex items-center justify-between text-sm">
                                    <span>{req.amount} credits</span>
                                    <Badge variant={config.variant} className="gap-1">
                                        <StatusIcon className="h-3 w-3" />
                                        {config.label}
                                    </Badge>
                                </div>
                            );
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
