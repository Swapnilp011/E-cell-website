
'use client';

import { useEffect, useState } from 'react';
import { useFirebaseAuth } from '@/hooks/use-firebase-auth';
import { useRouter } from 'next/navigation';
import { User } from 'firebase/auth';
import { LoadingSpinner } from '@/components/layout/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  name: string;
  email: string;
  college: string;
  yearOfStudy: string;
  course: string;
  degree: string;
  division: string;
  department: string;
  semester: string;
  cgpa: string;
  contact: string;
  address: string;
  skills: string;
}

export default function ProfilePage() {
  const { auth } = useFirebaseAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [initialProfile, setInitialProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        setLoading(true);
        try {
          const token = await user.getIdToken();
          const response = await fetch('/api/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch profile');
          }
          const data = await response.json();
          setProfile(data);
          setInitialProfile(data);
        } catch (error) {
          console.error(error);
          toast({ title: 'Error', description: 'Failed to load profile data.', variant: 'destructive' });
        } finally {
          setLoading(false);
        }
      };
      fetchProfile();
    }
  }, [user, toast]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (profile) {
      setProfile({ ...profile, [id]: value });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) return;
    setIsSaving(true);

    try {
      const token = await user.getIdToken();
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || 'Failed to update profile');
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setInitialProfile(updatedProfile);

      toast({ title: 'Success', description: 'Profile updated successfully!' });
    } catch (error: any) {
      console.error(error);
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>Could not load profile.</p>
        <Button onClick={() => router.push('/')}>Go to Homepage</Button>
      </div>
    );
  }

  const isChanged = JSON.stringify(profile) !== JSON.stringify(initialProfile);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleFormSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Input id="name" placeholder="Name" value={profile.name || ''} onChange={handleInputChange} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input id="email" placeholder="email" value={profile.email || ''} onChange={handleInputChange} readOnly />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input id="college" placeholder="college" value={profile.college || ''} onChange={handleInputChange} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input id="yearOfStudy" placeholder="Year of Study" value={profile.yearOfStudy || ''} onChange={handleInputChange} />
              </div>
               <div className="flex flex-col space-y-1.5">
                <Input id="course" placeholder="course" value={profile.course || ''} onChange={handleInputChange} />
              </div>
               <div className="flex flex-col space-y-1.5">
                <Input id="degree" placeholder="degree" value={profile.degree || ''} onChange={handleInputChange} />
              </div>
               <div className="flex flex-col space-y-1.5">
                <Input id="division" placeholder="division" value={profile.division || ''} onChange={handleInputChange} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input id="department" placeholder="Department" value={profile.department || ''} onChange={handleInputChange} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input id="semester" placeholder="Semester" value={profile.semester || ''} onChange={handleInputChange} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Input id="cgpa" placeholder="CGPA" value={profile.cgpa || ''} onChange={handleInputChange} />
              </div>
               <div className="flex flex-col space-y-1.5">
                <Input id="contact" placeholder="Contact" value={profile.contact || ''} onChange={handleInputChange} />
              </div>
               <div className="flex flex-col space-y-1.5">
                <Input id="address" placeholder="Address" value={profile.address || ''} onChange={handleInputChange} />
              </div>
               <div className="flex flex-col space-y-1.5">
                <Input id="skills" placeholder="Skills" value={profile.skills || ''} onChange={handleInputChange} />
              </div>
              <div className="flex justify-end gap-2">
                 <Button type="button" variant="outline" onClick={() => router.push('/')}>Back</Button>
                 <Button type="submit" disabled={!isChanged || isSaving}>{isSaving ? 'Saving...' : 'Save Changes'}</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
