import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, RefreshCcw, CheckCircle, XCircle, Clock, CreditCard } from 'lucide-react';

export default function RefundPolicyPage() {
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
                            <RefreshCcw className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
                            Refund & Cancellation Policy
                        </h1>
                        <p className="text-muted-foreground">Last updated: February 9, 2026</p>
                    </div>
                </section>

                <section className="py-12 bg-background">
                    <div className="container px-4 md:px-6 mx-auto max-w-4xl">
                        <div className="grid gap-6">
                            <Card className="p-6 rounded-xl border bg-card shadow-sm">
                                <CardContent className="p-0 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <CreditCard className="h-5 w-5 text-primary" />
                                        </div>
                                        <h2 className="text-xl font-bold">Credit Purchases</h2>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        LeadsPro operates on a credit-based system. When you purchase credits, they are immediately added to your account and can be used for lead generation services.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="p-6 rounded-xl border bg-card shadow-sm">
                                <CardContent className="p-0 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
                                            <CheckCircle className="h-5 w-5 text-green-600" />
                                        </div>
                                        <h2 className="text-xl font-bold">Refund Eligibility</h2>
                                    </div>
                                    <p className="text-muted-foreground mb-2">Refunds may be considered in these circumstances:</p>
                                    <ul className="text-muted-foreground space-y-2 list-disc pl-5">
                                        <li><strong className="text-foreground">Technical Issues:</strong> Service fails due to problems on our end and credits are deducted without results</li>
                                        <li><strong className="text-foreground">Duplicate Payments:</strong> Charged multiple times for the same transaction</li>
                                        <li><strong className="text-foreground">Unauthorized Transactions:</strong> Transaction made without your authorization</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="p-6 rounded-xl border bg-card shadow-sm">
                                <CardContent className="p-0 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center">
                                            <XCircle className="h-5 w-5 text-red-600" />
                                        </div>
                                        <h2 className="text-xl font-bold">Non-Refundable Situations</h2>
                                    </div>
                                    <ul className="text-muted-foreground space-y-2 list-disc pl-5">
                                        <li>Credits that have already been used for lead extraction</li>
                                        <li>Dissatisfaction with lead quality (leads are from public sources)</li>
                                        <li>Change of mind after purchase</li>
                                        <li>Failure to use credits before account closure</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="p-6 rounded-xl border bg-card shadow-sm">
                                <CardContent className="p-0 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Clock className="h-5 w-5 text-primary" />
                                        </div>
                                        <h2 className="text-xl font-bold">Refund Process & Timeline</h2>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <h3 className="font-semibold mb-2">How to Request</h3>
                                            <ol className="text-muted-foreground space-y-1 list-decimal pl-5">
                                                <li>Contact us at rajkumr9091@gmail.com within 7 days of transaction</li>
                                                <li>Provide your registered email and transaction details</li>
                                                <li>Our team will review within 3-5 business days</li>
                                            </ol>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-2">If Approved</h3>
                                            <ul className="text-muted-foreground space-y-1 list-disc pl-5">
                                                <li>Credit/Debit Card: 5-7 business days</li>
                                                <li>UPI: 2-3 business days</li>
                                                <li>Net Banking: 5-7 business days</li>
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
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
                        <Link to="/refund-policy" className="text-foreground font-medium">Refund Policy</Link>
                        <Link to="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</Link>
                        <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
