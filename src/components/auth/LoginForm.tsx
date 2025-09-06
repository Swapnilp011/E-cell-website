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
import { useActionState, useEffect, useState, useTransition } from 'react';
import Link from 'next/link';
import { EcellLogo } from '../icons/EcellLogo';
import { loginUser, type LoginFormState } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { Terminal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/layout/LoadingSpinner';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useFirebaseAuth } from '@/hooks/use-firebase-auth';

const initialState: LoginFormState = {
  message: '',
  success: false,
};

export function LoginForm() {
  const [state, formAction] = useActionState(loginUser, initialState);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();
  const { auth } = useFirebaseAuth();
  const [clientError, setClientError] = useState<string | null>(null);

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      });
      router.push('/');
    }
  }, [state, toast, router]);

  const handleClientLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setClientError(null);
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    startTransition(async () => {
        try {
            if (!auth) throw new Error("Auth service not available");
            await signInWithEmailAndPassword(auth, email, password);
            // On success, call the server action to complete the process.
            formAction(formData);
        } catch (error: any) {
            let errorMessage = 'An unexpected error occurred.';
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                errorMessage = 'Invalid email or password.';
            } else {
                console.error("Login Error: ", error.code, error.message);
            }
            setClientError(errorMessage);
        }
    });
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
          <form onSubmit={handleClientLogin} className="space-y-4">
            {clientError && (
              <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Login Failed</AlertTitle>
                <AlertDescription>
                  {clientError}
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
                </div>
            </fieldset>
            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? 'Logging In...' : 'Login'}
            </Button>
          </form>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </>
  );
}
