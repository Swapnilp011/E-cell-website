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
import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { registerUser, type RegisterFormState } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { EcellLogo } from '../icons/EcellLogo';

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

  useEffect(() => {
    if (state.message && !state.success) {
      toast({
        title: 'Registration Failed',
        description: state.message,
        variant: 'destructive',
      });
    }
    if (state.success) {
      toast({
        title: 'Registration Successful',
        description: state.message,
      });
    }
  }, [state, toast]);

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
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" placeholder="John Doe" />
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
            />
            {state?.errors?.college && (
              <p className="text-sm text-destructive">
                {state.errors.college[0]}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                name="department"
                placeholder="e.g. CSE"
              />
              {state?.errors?.department && (
                <p className="text-sm text-destructive">
                  {state.errors.department[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="div">Division</Label>
              <Input id="div" name="div" placeholder="e.g. A1" />
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
