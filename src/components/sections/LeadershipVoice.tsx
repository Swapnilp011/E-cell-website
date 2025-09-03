'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { Loader2, Wand2 } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { getLeadershipSuggestions, type FormState } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';

const initialState: FormState = {
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Generate Suggestions
        </>
      )}
    </Button>
  );
}

export function LeadershipVoice() {
  const [state, formAction] = useFormState(
    getLeadershipSuggestions,
    initialState
  );
  const { toast } = useToast();
  const { pending } = useFormStatus();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && state.message !== 'Success') {
      toast({
        title: 'Error',
        description: state.message,
        variant: 'destructive',
      });
    }
    if (state.message === 'Success') {
      formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <section
      id="ai-assistant"
      className="w-full py-12 md:py-24 lg:py-32"
    >
      <div className="container grid items-start gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-24">
        <div className="flex flex-col space-y-4">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
              Leadership Voice AI
            </div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
              Amplify Your Message
            </h2>
            <p className="text-muted-foreground md:text-xl/relaxed">
              Use our GenAI assistant to analyze and improve your leadership
              testimonials. Get instant feedback on sentiment and actionable
              suggestions to make your words more impactful.
            </p>
          </div>
          <form action={formAction} ref={formRef}>
            <Card>
              <CardHeader>
                <CardTitle>Testimonial Analyzer</CardTitle>
                <CardDescription>
                  Enter a leadership testimonial below to get AI-powered
                  improvement suggestions.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full gap-2">
                  <Label htmlFor="testimonial">Testimonial Content</Label>
                  <Textarea
                    id="testimonial"
                    name="testimonial"
                    placeholder="e.g., 'John Doe is a great leader who always inspires the team...'"
                    rows={6}
                    required
                  />
                  {state.errors?.testimonial && (
                    <p className="text-sm font-medium text-destructive">
                      {state.errors.testimonial[0]}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <SubmitButton />
              </CardFooter>
            </Card>
          </form>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="font-headline text-2xl font-bold">Suggestions</h3>
          {pending ? (
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
            </Card>
          ) : state.data ? (
            <div className="space-y-6">
              <Card className="bg-secondary/50">
                <CardHeader>
                  <CardTitle>Sentiment Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    {state.data.sentimentAnalysis}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-secondary/50">
                <CardHeader>
                  <CardTitle>Improvement Suggestions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-code whitespace-pre-wrap text-muted-foreground">
                    {state.data.suggestions}
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="flex h-full min-h-[300px] flex-col items-center justify-center border-dashed">
              <CardContent className="text-center">
                <Wand2 className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">
                  Waiting for input
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your AI-generated suggestions will appear here.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}
