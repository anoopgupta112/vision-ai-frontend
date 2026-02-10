import CreateJobForm from '../components/CreateJobForm';
import JobsList from '../components/JobsList';
import CreditsHistory from '../components/CreditsHistory';
import RequestCreditsCard from '../components/RequestCreditsCard';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function LeadGenPage() {
    const [view, setView] = useState<'jobs' | 'history'>('jobs');

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Lead Generator</h2>
                    <p className="text-muted-foreground">Manage your extraction jobs and view leads.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant={view === 'jobs' ? 'default' : 'outline'} onClick={() => setView('jobs')}>Jobs</Button>
                    <Button variant={view === 'history' ? 'default' : 'outline'} onClick={() => setView('history')}>Credits History</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {view === 'jobs' ? (
                        <>
                            <CreateJobForm />
                            <JobsList />
                        </>
                    ) : (
                        <CreditsHistory />
                    )}
                </div>
                <div className="space-y-6">
                    <RequestCreditsCard />
                </div>
            </div>
        </div>
    );
}

