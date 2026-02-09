import { useQuery } from '@tanstack/react-query';
import { getPaymentHistory, type PaymentTransaction } from '../api/paymentsApi';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Loader2, CreditCard, CheckCircle2, XCircle, Clock, Plus } from 'lucide-react';
import { format } from 'date-fns';

const statusConfig = {
    success: { icon: CheckCircle2, color: 'bg-green-100 text-green-800', label: 'Success' },
    pending: { icon: Clock, color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
    failed: { icon: XCircle, color: 'bg-red-100 text-red-800', label: 'Failed' },
};

export default function PaymentHistoryPage() {
    const { data: transactions, isLoading } = useQuery({
        queryKey: ['payment-history'],
        queryFn: getPaymentHistory,
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Payment History</h1>
                    <p className="text-muted-foreground">View all your credit purchases</p>
                </div>
                <Link to="/lead-gen/buy-credits">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Buy Credits
                    </Button>
                </Link>
            </div>

            {transactions?.length === 0 ? (
                <Card className="text-center py-12">
                    <CardContent>
                        <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium mb-2">No transactions yet</h3>
                        <p className="text-muted-foreground mb-4">
                            You haven't made any credit purchases yet.
                        </p>
                        <Link to="/lead-gen/buy-credits">
                            <Button>Buy Your First Credits</Button>
                        </Link>
                    </CardContent>
                </Card>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Transactions</CardTitle>
                        <CardDescription>
                            {transactions?.length} transaction{transactions?.length !== 1 ? 's' : ''} found
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="relative w-full overflow-auto">
                            <table className="w-full caption-bottom text-sm">
                                <thead className="[&_tr]:border-b">
                                    <tr className="border-b">
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Order ID</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Amount</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Credits</th>
                                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="[&_tr:last-child]:border-0">
                                    {transactions?.map((tx: PaymentTransaction) => {
                                        const status = statusConfig[tx.status];
                                        const StatusIcon = status.icon;
                                        return (
                                            <tr key={tx.id} className="border-b transition-colors hover:bg-muted/50">
                                                <td className="p-4 align-middle">
                                                    {format(new Date(tx.created_at), 'PPP p')}
                                                </td>
                                                <td className="p-4 align-middle font-mono text-xs">
                                                    {tx.order_id}
                                                </td>
                                                <td className="p-4 align-middle font-semibold">
                                                    {tx.display_amount}
                                                </td>
                                                <td className="p-4 align-middle">
                                                    +{tx.credits} credits
                                                </td>
                                                <td className="p-4 align-middle">
                                                    <Badge variant="outline" className={`gap-1 ${status.color}`}>
                                                        <StatusIcon className="h-3 w-3" />
                                                        {status.label}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
