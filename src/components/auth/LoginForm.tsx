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
import Link from 'next/link';
import { EcellLogo } from '../icons/EcellLogo';
import { loginUser, type LoginFormState } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Terminal } from 'lucide-react';

const initialState: LoginFormState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? 'Logging In...' : 'Login'}
    </Button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(loginUser, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.success) {
      // We are showing the error in an Alert, so no need for a toast.
    }
    if (state.success) {
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });
      // Here you would typically redirect the user, e.g., router.push('/dashboard')
    }
  }, [state, toast]);

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="text-center">
        <EcellLogo className="mx-auto h-12 w-12" />
        <CardTitle className="mt-4 font-headline text-2xl">
          Login to E-Cell IICT
        </CardTitle>
        <CardDescription>
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
           {state?.errors?.general && (
             <Alert variant="destructive">
               <Terminal className="h-4 w-4" />
               <AlertTitle>Login Failed</AlertTitle>
               <AlertDescription>
                 {state.errors.general[0]}
               </AlertDescription>
             </Alert>
           )}
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
          <SubmitButton />
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Register
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
