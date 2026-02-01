import { useQuery } from '@tanstack/react-query';
import { getCreditsHistory } from '../api/creditsApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

export default function CreditsHistory() {
    const { data: history, isLoading } = useQuery({
        queryKey: ['credits-history'],
        queryFn: getCreditsHistory,
    });

    if (isLoading) return <div>Loading history...</div>;

    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>Credits History</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="relative w-full overflow-auto">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b">
                            <tr className="border-b">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Date</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Amount</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Reason</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Note</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {history?.map((item: any, index: number) => (
                                <tr key={index} className="border-b transition-colors hover:bg-muted/50">
                                    <td className="p-4 align-middle">{item.created_at ? format(new Date(item.created_at), 'PPP p') : '-'}</td>
                                    <td className={`p-4 align-middle font-bold ${item.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {item.amount > 0 ? '+' : ''}{item.amount}
                                    </td>
                                    <td className="p-4 align-middle">{item.reason}</td>
                                    <td className="p-4 align-middle">{item.note}</td>
                                </tr>
                            ))}
                            {!history?.length && (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-muted-foreground">No history found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
