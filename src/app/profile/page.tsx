'use client';

import { useEffect, useState, useTransition } from 'react';
import { type User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { getUserProfile, type UserProfile, updateUserProfile, type UpdateProfileFormState } from '@/lib/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { EcellLogo } from '@/components/icons/EcellLogo';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useActionState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useFormStatus } from 'react-dom';
import { useFirebaseAuth } from '@/hooks/use-firebase-auth';

const initialState: UpdateProfileFormState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Saving...' : 'Save Changes'}
    </Button>
  );
}


export default function ProfilePage() {
  const { auth, onAuthStateChanged } = useFirebaseAuth();
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [showCustomCourse, setShowCustomCourse] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const [state, formAction] = useActionState(updateUserProfile, initialState);

  useEffect(() => {
    if (!auth) {
        router.push('/login');
        return;
    }
    const unsubscribe = onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        try {
          const token = await user.getIdToken();
          setIdToken(token);
          const profile = await getUserProfile(token);
          setUserProfile(profile);
          const standardCourses = ["B.Tech", "M.Tech", "BCA", "MCA"];
          if (profile && !standardCourses.includes(profile.course)) {
            setShowCustomCourse(true);
          }
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        }
      } else {
        router.push('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, onAuthStateChanged, router]);

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Profile Updated',
        description: 'Your information has been saved.',
      });
      setIsEditing(false);
      // Re-fetch profile to show updated data
      if (user) {
        user.getIdToken().then(token => {
            getUserProfile(token).then(profile => {
                setUserProfile(profile);
                 const standardCourses = ["B.Tech", "M.Tech", "BCA", "MCA"];
                if (profile && !standardCourses.includes(profile.course)) {
                    setShowCustomCourse(true);
                } else {
                    setShowCustomCourse(false);
                }
            });
        });
      }
    } else if (state.message && state.errors) {
       toast({
        title: 'Update Failed',
        description: 'Please check the form for errors.',
        variant: 'destructive'
      });
    }
  }, [state, toast, user])

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
    return (
         <div className="flex min-h-screen items-center justify-center">
             <Card>
                 <CardHeader>
                     <CardTitle>Error</CardTitle>
                     <CardDescription>Could not load user profile. Please try logging in again.</CardDescription>
                 </CardHeader>
                 <CardContent>
                     <Button asChild>
                         <Link href="/login">Go to Login</Link>
                     </Button>
                 </CardContent>
             </Card>
        </div>
    );
  }
  
  const displayProfile = (
     <div className="space-y-4">
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
          <p className="text-sm font-medium text-muted-foreground">Course</p>
          <p className="text-lg font-semibold">{userProfile.course}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Degree</p>
          <p className="text-lg font-semibold">{userProfile.degree}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-muted-foreground">Division</p>
          <p className="text-lg font-semibold">{userProfile.division}</p>
        </div>
      </div>
      <div className="text-center text-sm text-muted-foreground">
        Member since {userProfile.createdAt}
      </div>
    </div>
  );
  
  const editProfileForm = (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="idToken" value={idToken ?? ''} />
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" defaultValue={userProfile.name} required />
        {state?.errors?.name && <p className="text-sm text-destructive">{state.errors.name[0]}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="college">College</Label>
        <Input id="college" name="college" defaultValue={userProfile.college} required />
        {state?.errors?.college && <p className="text-sm text-destructive">{state.errors.college[0]}</p>}
      </div>
       <div className="space-y-2">
        <Label htmlFor="year">Year of Study</Label>
        <Select name="year" defaultValue={userProfile.yearOfStudy} required>
          <SelectTrigger id="year">
            <SelectValue placeholder="Select your year" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="First Year">First Year</SelectItem>
            <SelectItem value="Second Year">Second Year</SelectItem>
            <SelectItem value="Third Year">Third Year</SelectItem>
            <SelectItem value="Final Year">Final Year</SelectItem>
          </SelectContent>
        </Select>
        {state?.errors?.year && <p className="text-sm text-destructive">{state.errors.year[0]}</p>}
      </div>
       <div className="space-y-2">
            <Label htmlFor="course">Course</Label>
            <Select name="course" defaultValue={showCustomCourse ? "Other" : userProfile.course} required onValueChange={(value) => setShowCustomCourse(value === 'Other')}>
              <SelectTrigger id="course">
                <SelectValue placeholder="Select your course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="B.Tech">B.Tech</SelectItem>
                <SelectItem value="M.Tech">M.Tech</SelectItem>
                <SelectItem value="BCA">BCA</SelectItem>
                <SelectItem value="MCA">MCA</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {state?.errors?.course && <p className="text-sm text-destructive">{state.errors.course[0]}</p>}
          </div>
        {showCustomCourse && (
            <div className="space-y-2">
              <Label htmlFor="customCourse">Please specify your course</Label>
              <Input
                id="customCourse"
                name="customCourse"
                defaultValue={showCustomCourse ? userProfile.course : ""}
                placeholder="e.g. B.Sc IT"
                required
              />
               {state?.errors?.customCourse && (
                <p className="text-sm text-destructive">{state.errors.customCourse[0]}</p>
              )}
            </div>
          )}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="degree">Degree</Label>
          <Input id="degree" name="degree" defaultValue={userProfile.degree} required />
          {state?.errors?.degree && <p className="text-sm text-destructive">{state.errors.degree[0]}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="div">Division</Label>
          <Input id="div" name="div" defaultValue={userProfile.division} required />
          {state?.errors?.div && <p className="text-sm text-destructive">{state.errors.div[0]}</p>}
        </div>
      </div>
       <CardFooter className="flex justify-center gap-4 pt-4">
            {isEditing ? (
              <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                <SubmitButton />
              </>
            ) : (
               <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
       </CardFooter>
    </form>
  )

  return (
     <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center">
            <Link href="/" className="mr-6 flex items-center gap-2">
            <EcellLogo className="h-8 w-8" />
            <span className="font-headline text-lg font-bold">E-Cell IICT</span>
            </Link>
        </div>
      </header>
       <main className="flex flex-1 items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center">
            <Avatar className="mx-auto h-24 w-24 border-2 border-primary">
              <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
              <AvatarFallback>{getAvatarFallback(userProfile.name)}</AvatarFallback>
            </Avatar>
            <CardTitle className="mt-4 font-headline text-3xl">{userProfile.name}</CardTitle>
            <CardDescription>{userProfile.email}</CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? editProfileForm : displayProfile}
          </CardContent>
          {!isEditing && (
            <CardFooter className="flex justify-center gap-4 pt-4">
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                <Button asChild variant="ghost">
                <Link href="/">Back to Home</Link>
                </Button>
            </CardFooter>
          )}
        </Card>
      </main>
    </div>
  );
}