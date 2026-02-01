import { useQuery } from '@tanstack/react-query';
import { getJobLeads } from '../api/jobsApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import api from '@/lib/axios';

export default function LeadsTable({ jobId }: { jobId: string }) {
    const { data: leads, isLoading } = useQuery({
        queryKey: ['leads', jobId],
        queryFn: () => getJobLeads(jobId),
    });

    const handleDownload = async () => {
        try {
            const response = await api.get(`/lead_gen/leads/job/${jobId}/download`, {
                responseType: 'blob',
            });

            // Create a blob URL and trigger download
            const blob = new Blob([response.data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `leads_${jobId}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Download failed:', error);
        }
    };

    if (isLoading) return <div>Loading leads...</div>;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Extracted Leads</CardTitle>
                <Button onClick={handleDownload} variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download CSV
                </Button>
            </CardHeader>
            <CardContent>
                <div className="relative w-full overflow-auto max-h-[600px]">
                    <table className="w-full caption-bottom text-sm">
                        <thead className="[&_tr]:border-b sticky top-0 bg-white">
                            <tr className="border-b">
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Name</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Phone</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Website</th>
                                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Address</th>
                            </tr>
                        </thead>
                        <tbody className="[&_tr:last-child]:border-0">
                            {leads?.map((lead: any, index: number) => (
                                <tr key={index} className="border-b transition-colors hover:bg-muted/50">
                                    <td className="p-4 align-middle font-medium">{lead.name}</td>
                                    <td className="p-4 align-middle">{lead.phone || 'N/A'}</td>
                                    <td className="p-4 align-middle">
                                        {lead.website ? <a href={lead.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{lead.website}</a> : 'N/A'}
                                    </td>
                                    <td className="p-4 align-middle">{lead.address || 'N/A'}</td>
                                </tr>
                            ))}
                            {!leads?.length && (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center text-muted-foreground">No leads found yet.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
