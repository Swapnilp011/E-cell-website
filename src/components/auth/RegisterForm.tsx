'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActionState, useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { registerUser, type RegisterFormState } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { EcellLogo } from '../icons/EcellLogo';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Terminal } from 'lucide-react';
import { useRouter } from 'next/navigation';

const initialState: RegisterFormState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Creating Account...' : 'Create Account'}
    </Button>
  );
}

export function RegisterForm() {
  const [state, formAction] = useActionState(registerUser, initialState);
  const { toast } = useToast();
  const router = useRouter();
  const [showCustomCourse, setShowCustomCourse] = useState(false);

  useEffect(() => {
    if (state.message && !state.success) {
      // Error messages are now shown in an Alert, but we can still toast for general server errors
      if(state.errors?.general) {
        toast({
          title: 'Registration Failed',
          description: state.message,
          variant: 'destructive',
        });
      }
    }
    if (state.success) {
      toast({
        title: 'Registration Successful',
        description: state.message,
      });
      router.push('/');
    }
  }, [state, toast, router]);

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="text-center">
        <EcellLogo className="mx-auto h-12 w-12" />
        <CardTitle className="mt-4 font-headline text-2xl">
          Create an Account
        </CardTitle>
        <CardDescription>
          Join the E-Cell IICT community.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
           {state?.errors?.general && (
             <Alert variant="destructive">
               <Terminal className="h-4 w-4" />
               <AlertTitle>Registration Failed</AlertTitle>
               <AlertDescription>
                 {state.errors.general[0]}
               </AlertDescription>
             </Alert>
           )}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="John Doe" required />
            {state?.errors?.name && (
              <p className="text-sm text-destructive">{state.errors.name[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
            />
            {state?.errors?.email && (
              <p className="text-sm text-destructive">{state.errors.email[0]}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
            />
            {state?.errors?.password && (
              <p className="text-sm text-destructive">
                {state.errors.password[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="college">College</Label>
            <Input
              id="college"
              name="college"
              placeholder="MGMU's IICT"
              required
            />
            {state?.errors?.college && (
              <p className="text-sm text-destructive">
                {state.errors.college[0]}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="year">Year of Study</Label>
            <Select name="year" required>
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
            {state?.errors?.year && (
              <p className="text-sm text-destructive">{state.errors.year[0]}</p>
            )}
          </div>
           <div className="space-y-2">
            <Label htmlFor="course">Course</Label>
            <Select name="course" required onValueChange={(value) => setShowCustomCourse(value === 'Other')}>
              <SelectTrigger id="course">
                <SelectValue placeholder="Select your course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="B.Tech">B.Tech</SelectItem>
                <SelectItem value="M.Tech">M.Tech</SelectItem>
                <SelectItem value="BCA">BCA</CataItem>
                <SelectItem value="MCA">MCA</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
            {state?.errors?.course && (
              <p className="text-sm text-destructive">{state.errors.course[0]}</p>
            )}
          </div>
           {showCustomCourse && (
            <div className="space-y-2">
              <Label htmlFor="customCourse">Please specify your course</Label>
              <Input
                id="customCourse"
                name="customCourse"
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
              <Input
                id="degree"
                name="degree"
                placeholder="e.g. CSE"
                required
              />
              {state?.errors?.degree && (
                <p className="text-sm text-destructive">
                  {state.errors.degree[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="div">Division</Label>
              <Input id="div" name="div" placeholder="e.g. A1" required />
              {state?.errors?.div && (
                <p className="text-sm text-destructive">{state.errors.div[0]}</p>
              )}
            </div>
          </div>
          <SubmitButton />
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
