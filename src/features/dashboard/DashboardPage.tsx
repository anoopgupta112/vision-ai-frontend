import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                <p className="text-muted-foreground">Select a tool to launch your workspace.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Product Card: Lead Generator */}
                <Card className="flex flex-col h-full hover:shadow-md transition-shadow cursor-pointer border-2 hover:border-primary/50">
                    <CardHeader>
                        <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
                            <MapPin className="h-6 w-6 text-blue-600" />
                        </div>
                        <CardTitle>Lead Generator</CardTitle>
                        <CardDescription>Extract the business leads from Google Maps</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <p className="text-sm text-muted-foreground mb-4">
                            Find and export business contact details including phone, website, and address based on location and keywords.
                        </p>
                    </CardContent>
                    <div className="p-6 pt-0 mt-auto">
                        <Link to="/lead-gen">
                            <Button className="w-full group">
                                Launch App <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                        </Link>
                    </div>
                </Card>

                {/* Placeholder for future products */}
                <Card className="flex flex-col h-full bg-muted/50 border-dashed">
                    <CardHeader>
                        <CardTitle className="text-muted-foreground">Coming Soon</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center flex-1 min-h-[100px]">
                        <p className="text-sm text-center text-muted-foreground">More tools are being built.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
