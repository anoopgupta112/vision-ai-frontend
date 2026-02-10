import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, MapPin, Database, Zap } from 'lucide-react';
import PublicHeader from '@/components/PublicHeader';

export default function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <PublicHeader />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-16 sm:py-24 md:py-32 bg-gradient-to-b from-background to-muted/50">
                    <div className="container px-4 md:px-6 mx-auto text-center space-y-6">
                        <h1 className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl lg:text-7xl">
                            Supercharge Your <span className="text-primary">Lead Generation</span>
                        </h1>
                        <p className="mx-auto max-w-[700px] text-muted-foreground text-base md:text-xl">
                            Extract thousands of targeted business leads from Google Maps in seconds.
                            Simple, scalable, and powerful data at your fingertips.
                        </p>
                        <div className="flex justify-center gap-4 pt-4">
                            <Link to="/auth/register">
                                <Button size="lg" className="h-12 px-6 sm:px-8 text-base sm:text-lg">
                                    Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Features / Product Preview */}
                <section className="py-12 sm:py-20 bg-background">
                    <div className="container px-4 md:px-6 mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                            <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <MapPin className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Google Maps Extraction</h3>
                                <p className="text-muted-foreground">
                                    Pinpoint businesses by location and keyword. Get accurate data directly from the source.
                                </p>
                            </div>
                            <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <Database className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Detailed Contacts</h3>
                                <p className="text-muted-foreground">
                                    Enriched data including phone numbers, websites, addresses, and more for your CRM.
                                </p>
                            </div>
                            <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
                                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                    <Zap className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Instant CSV Export</h3>
                                <p className="text-muted-foreground">
                                    Download your leads instantly in CSV format ready for cold outreach campaigns.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-6 px-4 md:px-8 border-t">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        © 2024 LeadsPro Inc. All rights reserved.
                    </p>
                    <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                        <Link to="/privacy-policy" className="hover:text-foreground transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/refund-policy" className="hover:text-foreground transition-colors">
                            Refund Policy
                        </Link>
                        <Link to="/terms-of-service" className="hover:text-foreground transition-colors">
                            Terms of Service
                        </Link>
                        <Link to="/contact" className="hover:text-foreground transition-colors">
                            Contact
                        </Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
