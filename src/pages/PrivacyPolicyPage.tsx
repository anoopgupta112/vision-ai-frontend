import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Shield, Eye, Lock, Database, UserCheck } from 'lucide-react';

export default function PrivacyPolicyPage() {
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
                            <Shield className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
                            Privacy Policy
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
                                            <Eye className="h-5 w-5 text-primary" />
                                        </div>
                                        <h2 className="text-xl font-bold">Introduction</h2>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        LeadsPro is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our lead generation platform and services.
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="p-6 rounded-xl border bg-card shadow-sm">
                                <CardContent className="p-0 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Database className="h-5 w-5 text-primary" />
                                        </div>
                                        <h2 className="text-xl font-bold">Information We Collect</h2>
                                    </div>
                                    <div className="space-y-3">
                                        <div>
                                            <h3 className="font-semibold mb-2">Personal Information</h3>
                                            <ul className="text-muted-foreground space-y-1 list-disc pl-5">
                                                <li>Account information: email address, name, and password</li>
                                                <li>Payment information: processed securely through Razorpay</li>
                                                <li>Usage data: search queries, lead extraction history</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold mb-2">Automatically Collected</h3>
                                            <ul className="text-muted-foreground space-y-1 list-disc pl-5">
                                                <li>IP address and browser type</li>
                                                <li>Device information and usage patterns</li>
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="p-6 rounded-xl border bg-card shadow-sm">
                                <CardContent className="p-0 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <UserCheck className="h-5 w-5 text-primary" />
                                        </div>
                                        <h2 className="text-xl font-bold">How We Use Your Information</h2>
                                    </div>
                                    <ul className="text-muted-foreground space-y-1 list-disc pl-5">
                                        <li>To provide and maintain our services</li>
                                        <li>To process your transactions and send related information</li>
                                        <li>To send administrative information and updates</li>
                                        <li>To respond to inquiries and offer support</li>
                                        <li>To improve our platform and user experience</li>
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card className="p-6 rounded-xl border bg-card shadow-sm">
                                <CardContent className="p-0 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                            <Lock className="h-5 w-5 text-primary" />
                                        </div>
                                        <h2 className="text-xl font-bold">Data Security & Your Rights</h2>
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        We implement appropriate technical and organizational security measures to protect your personal information. All payment transactions are processed through Razorpay's secure payment gateway with industry-standard encryption.
                                    </p>
                                    <p className="text-muted-foreground leading-relaxed">
                                        You have the right to access, update, or delete your personal information. Contact us at <span className="text-primary">rajkumr9091@gmail.com</span> to exercise these rights.
                                    </p>
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
                        <Link to="/privacy-policy" className="text-foreground font-medium">Privacy Policy</Link>
                        <Link to="/refund-policy" className="hover:text-foreground transition-colors">Refund Policy</Link>
                        <Link to="/terms-of-service" className="hover:text-foreground transition-colors">Terms of Service</Link>
                        <Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link>
                    </nav>
                </div>
            </footer>
        </div>
    );
}
