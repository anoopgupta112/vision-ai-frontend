import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuthStore } from '../authStore';
import { updateProfile } from '../api/authApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProfilePage() {
    const { user, updateUser } = useAuthStore();
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: user?.email || '',
        },
    });

    const mutation = useMutation({
        mutationFn: updateProfile,
        onSuccess: (data) => {
            toast.success('Profile updated successfully');
            updateUser(data);
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.detail || 'Failed to update profile');
        },
    });

    const onSubmit = (data: any) => {
        mutation.mutate(data);
    };

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight">Profile Settings</h2>

            <Card className="max-w-md">
                <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" {...register('email')} />
                        </div>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
