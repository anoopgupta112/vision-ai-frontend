import CreateJobForm from '../components/CreateJobForm';
import JobsList from '../components/JobsList';
import CreditsHistory from '../components/CreditsHistory';
// Shadcn Tabs needed. I'll manually create basic Tabs or assume I have them?
// I don't have Tabs component yet. I will simulate it or create it.
// Let's create Tabs component quickly first.

// Wait, I can't restart the tool sequence. I will write a simple layout first.
// I'll just stack them for now, or use a simple state for toggling.

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function LeadGenPage() {
    const [view, setView] = useState<'jobs' | 'history'>('jobs');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Lead Generator</h2>
                    <p className="text-muted-foreground">Manage your extraction jobs and view leads.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant={view === 'jobs' ? 'default' : 'outline'} onClick={() => setView('jobs')}>Jobs</Button>
                    <Button variant={view === 'history' ? 'default' : 'outline'} onClick={() => setView('history')}>Credits History</Button>
                </div>
            </div>

            {view === 'jobs' ? (
                <>
                    <CreateJobForm />
                    <JobsList />
                </>
            ) : (
                <CreditsHistory />
            )}
        </div>
    );
}
