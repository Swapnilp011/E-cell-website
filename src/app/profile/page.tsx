'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase/client';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { getUserProfile, type UserProfile } from '@/lib/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { EcellLogo } from '@/components/icons/EcellLogo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          const profile = await getUserProfile();
          setUserProfile(profile);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        }
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  const getAvatarFallback = (name: string | null | undefined) => {
    if (!name) return 'U';
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('');
    return initials.toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <EcellLogo className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  if (!user || !userProfile) {
    return null; // Or a more graceful error state
  }

  return (
     <div className="flex min-h-screen flex-col bg-background">
       <main className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <Avatar className="mx-auto h-24 w-24 border-2 border-primary">
              <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
              <AvatarFallback>{getAvatarFallback(user.displayName)}</AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4 font-headline text-3xl">{userProfile.name}</CardTitle>
            <CardDescription>{userProfile.email}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 rounded-lg border p-4 sm:grid-cols-2">
               <div>
                <p className="text-sm font-medium text-muted-foreground">College</p>
                <p className="text-lg font-semibold">{userProfile.college}</p>
              </div>
               <div>
                <p className="text-sm font-medium text-muted-foreground">Year of Study</p>
                <p className="text-lg font-semibold">{userProfile.yearOfStudy}</p>
              </div>
               <div>
                <p className="text-sm font-medium text-muted-foreground">Department</p>
                <p className="text-lg font-semibold">{userProfile.department}</p>
              </div>
               <div>
                <p className="text-sm font-medium text-muted-foreground">Division</p>
                <p className="text-lg font-semibold">{userProfile.division}</p>
              </div>
            </div>
             <div className="text-center text-sm text-muted-foreground">
              Member since {userProfile.createdAt}
            </div>
             <div className="flex justify-center pt-4">
              <Button asChild>
                <Link href="/home">Back to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
