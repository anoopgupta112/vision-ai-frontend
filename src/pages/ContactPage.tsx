import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Mail, Clock, MessageSquare } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="px-6 h-16 flex items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
                <Link to="/" className="flex items-center gap-2">
                    <Zap className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold tracking-tight">LeadsPro</span>
                </Link>
                <nav className="flex items-center gap-4">
                    <Link to="/auth/login">
                        <Button variant="ghost">Login</Button>
                    </Link>
                    <Link to="/auth/register">
                        <Button>Get Started</Button>
                    </Link>
                </nav>
            </header>

            <main className="flex-1">
                <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/50">
                    <div className="container px-4 md:px-6 mx-auto text-center space-y-4">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                            <MessageSquare className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
                            Contact Us
                        </h1>
                        <p className="text-muted-foreground md:text-lg max-w-[600px] mx-auto">
                            Have questions? We're here to help. Reach out to us through any of the channels below.
                        </p>
                    </div>
                </section>

                <section className="py-12 bg-background">
                    <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                        <div className="grid md:grid-cols-2 gap-6">
                            <Card className="p-6 rounded-xl border bg-card shadow-sm">
                                <CardContent className="p-0 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Mail className="h-6 w-6 text-primary" />
                                        </div>
                                        <h2 className="text-xl font-bold">Email Support</h2>
                                    </div>
                                    <p className="text-muted-foreground">
                                        For general inquiries and support:
                                    </p>
                                    <a href="mailto:rajkumr9091@gmail.com" className="text-primary font-medium text-lg hover:underline">
                                        rajkumr9091@gmail.com
                                    </a>
                                    <p className="text-sm text-muted-foreground">
                                        We typically respond within 24-48 hours
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="p-6 rounded-xl border bg-card shadow-sm">
                                <CardContent className="p-0 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Clock className="h-6 w-6 text-primary" />
                                        </div>
                                        <h2 className="text-xl font-bold">Business Hours</h2>
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-muted-foreground">
                                            <span className="font-medium text-foreground">Monday - Friday:</span><br />
                                            10:00 AM - 6:00 PM IST
                                        </p>
                                        <p className="text-muted-foreground">
                                            <span className="font-medium text-foreground">Saturday - Sunday:</span><br />
                                            Closed
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="mt-8 p-6 rounded-xl bg-muted/50 border">
                            <h3 className="font-semibold mb-4">Quick Links</h3>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>
                                <Link to="/refund-policy" className="text-primary hover:underline">Refund Policy</Link>
                                <Link to="/terms-of-service" className="text-primary hover:underline">Terms of Service</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="py-6 md:px-8 border-t">
                <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        © 2024 LeadsPro Inc. All rights reserved.
                    </p>
                    <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
                        <Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                        <Link to="/refund-policy" className="hover:text-foreground transition-colors">Refund Policy</Link>
                        <Link to="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</Link>
                        <Link to="/contact" className="text-foreground font-medium">Contact</Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
