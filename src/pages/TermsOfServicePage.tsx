import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, User, CreditCard, AlertTriangle, Scale, Mail } from 'lucide-react';
import PublicHeader from '@/components/PublicHeader';

export default function TermsOfServicePage() {
    return (
        <div className="flex min-h-screen flex-col">
            <PublicHeader />

            <main className="flex-1">
                <section className="py-12 sm:py-16 md:py-24 bg-gradient-to-b from-background to-muted/50">
                    <div className="container px-4 md:px-6 mx-auto text-center space-y-4">
                        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                            <FileText className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl">
                            Terms of Service
                        </h1>
                        <p className="text-muted-foreground">Last updated: February 9, 2026</p>
                    </div>
                </section>

                <section className="py-8 sm:py-12 bg-background">
                    <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                        <div className="grid gap-6">
                            <Card className="p-6 rounded-xl border bg-card shadow-sm">
                                <CardContent className="p-0 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Scale className="h-5 w-5 text-primary" />
                                        </div>
                                        <h2 className="text-xl font-bold">Acceptance of Terms</h2>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        By accessing or using LeadsPro, you agree to be bound by these Terms of Service. LeadsPro is a lead generation platform that extracts business information from publicly available sources including Google Maps.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="p-6 rounded-xl border bg-card shadow-sm">
                                <CardContent className="p-0 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <User className="h-5 w-5 text-primary" />
                                        </div>
                                        <h2 className="text-xl font-bold">User Accounts</h2>
                                    </div>
                                    <ul className="text-muted-foreground space-y-2 list-disc pl-5">
                                        <li>You must provide accurate and complete registration information</li>
                                        <li>You are responsible for maintaining the security of your account</li>
                                        <li>Notify us immediately of any unauthorized access</li>
                                        <li>One account per user; multiple accounts are prohibited</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="p-6 rounded-xl border bg-card shadow-sm">
                                <CardContent className="p-0 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <CreditCard className="h-5 w-5 text-primary" />
                                        </div>
                                        <h2 className="text-xl font-bold">Credit System & Payments</h2>
                                    </div>
                                    <ul className="text-muted-foreground space-y-2 list-disc pl-5">
                                        <li>Credits are non-transferable between accounts</li>
                                        <li>Credits do not expire while your account is active</li>
                                        <li>Credit consumption is based on the number of leads extracted</li>
                                        <li>All payments are processed securely through Razorpay</li>
                                        <li>Prices are displayed in Indian Rupees (INR)</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="p-6 rounded-xl border bg-card shadow-sm">
                                <CardContent className="p-0 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                                            <AlertTriangle className="h-5 w-5 text-red-600" />
                                        </div>
                                        <h2 className="text-xl font-bold">Acceptable Use</h2>
                                    </div>
                                    <p className="text-muted-foreground mb-2">You agree NOT to:</p>
                                    <ul className="text-muted-foreground space-y-2 list-disc pl-5">
                                        <li>Use the Service for any unlawful purpose</li>
                                        <li>Use extracted leads for spamming or harassment</li>
                                        <li>Attempt to circumvent any security measures</li>
                                        <li>Resell or redistribute extracted leads without authorization</li>
                                        <li>Use automated tools beyond normal API usage</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="p-6 rounded-xl border bg-card shadow-sm">
                                <CardContent className="p-0 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Mail className="h-5 w-5 text-primary" />
                                        </div>
                                        <h2 className="text-xl font-bold">Contact & Governing Law</h2>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        These Terms shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.
                                    </p>
                                    <p className="text-muted-foreground">
                                        For questions, contact us at: <span className="text-primary">rajkumr9091@gmail.com</span>
                                    </p>
                                </CardContent>
                            </Card>
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
                        <Link to="/privacy-policy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                        <Link to="/refund-policy" className="hover:text-foreground transition-colors">Refund Policy</Link>
                        <Link to="/terms-of-service" className="text-foreground font-medium">Terms of Service</Link>
                        <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
