
'use client';
import { useEffect, useState } from 'react';
import { useFirebaseAuth } from '@/hooks/use-firebase-auth';
import { useRouter } from 'next/navigation';
import { User } from 'firebase/auth';
import { LoadingSpinner } from '@/components/layout/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function AdminPage() {
    const { auth } = useFirebaseAuth();
    const router = useRouter();
    const { toast } = useToast();
    const [user, setUser] = useState<User | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
                const token = await user.getIdTokenResult();
                setIsAdmin(!!token.claims.admin);
            } else {
                setUser(null);
                setIsAdmin(false);
                router.push('/login');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [auth, router]);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !image) return;

        const token = await user.getIdToken();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', image);

        const response = await fetch('/api/news', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.ok) {
            toast({ title: 'Success', description: 'News article created successfully.' });
            setTitle('');
            setContent('');
            setImage(null);
            // Also reset the file input
            const fileInput = document.getElementById('image') as HTMLInputElement;
            if(fileInput) fileInput.value = '';
        } else {
            const { error } = await response.json();
            toast({ title: 'Error', description: error || 'Failed to create news article.', variant: 'destructive' });
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (!isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <p>You are not authorized to view this page.</p>
                <Button onClick={() => router.push('/')}>Go to Homepage</Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create News Article</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleFormSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Input
                                    id="title"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Textarea
                                    id="content"
                                    placeholder="Content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Input
                                    id="image"
                                    type="file"
                                    onChange={(e) =>
                                        setImage(e.target.files ? e.target.files[0] : null)
                                    }
                                />
                            </div>
                            <Button type="submit">Create Article</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
