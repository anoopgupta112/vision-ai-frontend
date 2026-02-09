import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import Layout from '@/components/Layout'
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import DashboardPage from '@/features/dashboard/DashboardPage';
import LeadGenPage from '@/features/lead-gen/pages/LeadGenPage';
import JobDetailsPage from '@/features/lead-gen/pages/JobDetailsPage';
import BuyCreditsPage from '@/features/lead-gen/pages/BuyCreditsPage';
import PaymentHistoryPage from '@/features/lead-gen/pages/PaymentHistoryPage';
import PaymentStatusPage from '@/features/lead-gen/pages/PaymentStatusPage';
import ProfilePage from '@/features/auth/pages/ProfilePage';
import AdminPage from '@/features/admin-dashboard/pages/AdminPage';
import LandingPage from '@/pages/LandingPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import RefundPolicyPage from '@/pages/RefundPolicyPage';
import TermsOfServicePage from '@/pages/TermsOfServicePage';
import ContactPage from '@/pages/ContactPage';
import RequireAuth from '@/components/RequireAuth';

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LandingPage />} />

                        {/* Public Routes */}
                        <Route path="/auth/login" element={<LoginPage />} />
                        <Route path="/auth/register" element={<RegisterPage />} />
                        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                        <Route path="/refund-policy" element={<RefundPolicyPage />} />
                        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                        <Route path="/contact" element={<ContactPage />} />

                        {/* Protected Routes */}
                        <Route path="/dashboard" element={
                            <RequireAuth>
                                <Layout>
                                    <DashboardPage />
                                </Layout>
                            </RequireAuth>
                        } />

                        <Route path="/lead-gen" element={
                            <RequireAuth>
                                <Layout>
                                    <LeadGenPage />
                                </Layout>
                            </RequireAuth>
                        } />

                        <Route path="/lead-gen/jobs/:id" element={
                            <RequireAuth>
                                <Layout>
                                    <JobDetailsPage />
                                </Layout>
                            </RequireAuth>
                        } />

                        <Route path="/lead-gen/buy-credits" element={
                            <RequireAuth>
                                <Layout>
                                    <BuyCreditsPage />
                                </Layout>
                            </RequireAuth>
                        } />

                        <Route path="/lead-gen/payment-history" element={
                            <RequireAuth>
                                <Layout>
                                    <PaymentHistoryPage />
                                </Layout>
                            </RequireAuth>
                        } />

                        <Route path="/lead-gen/payment/status" element={
                            <RequireAuth>
                                <Layout>
                                    <PaymentStatusPage />
                                </Layout>
                            </RequireAuth>
                        } />

                        <Route path="/profile" element={
                            <RequireAuth>
                                <Layout>
                                    <ProfilePage />
                                </Layout>
                            </RequireAuth>
                        } />

                        <Route path="/admin" element={
                            <RequireAuth adminOnly>
                                <Layout>
                                    <AdminPage />
                                </Layout>
                            </RequireAuth>
                        } />
                    </Routes>
                </BrowserRouter>
                <Toaster />
            </>
        </QueryClientProvider>
    )
}

export default App
