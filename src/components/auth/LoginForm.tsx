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
import { useActionState, useEffect, useTransition } from 'react';
import Link from 'next/link';
import { EcellLogo } from '../icons/EcellLogo';
import { loginUser, type LoginFormState } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Terminal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useFirebaseAuth } from '@/hooks/use-firebase-auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { LoadingSpinner } from '@/components/layout/LoadingSpinner';

const initialState: LoginFormState = {
  message: '',
  success: false,
};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginUser, initialState);
  const { toast } = useToast();
  const router = useRouter();
  const { auth } = useFirebaseAuth();

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });
      router.push('/');
    } else if (state.message && state.errors) {
       toast({
        title: 'Login Failed',
        description: state.errors.general?.[0] || 'Please check your credentials.',
        variant: 'destructive',
      });
    }
  }, [state, router, toast]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formAction(formData);
  };

  return (
    <>
      {isPending && <LoadingSpinner fullPage />}
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
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {state.message && !state.success && (
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Login Failed</AlertTitle>
                <AlertDescription>
                  {state.errors?.general?.[0] || state.message}
                </AlertDescription>
              </Alert>
            )}
            <fieldset disabled={isPending} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                />
                {state.errors?.email && (
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
                 {state.errors?.password && (
                  <p className="text-sm text-destructive">{state.errors.password[0]}</p>
                )}
              </div>
            </fieldset>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Logging In...' : 'Login'}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="font-medium text-primary hover:underline"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  );
}
