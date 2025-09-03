import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MedalIcon, LightbulbIcon, TrophyIcon } from 'lucide-react';

export function Eureka() {
  return (
    <section id="eureka" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
              Eureka Ideathon
            </div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              Turn Your Idea into Reality
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Eureka is our flagship ideathon event, where brilliant minds come
              together to solve real-world problems, build amazing products, and
              compete for exciting prizes.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <LightbulbIcon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="font-headline">
                Rules & Regulations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Open to all students. Teams of 2-4. Submissions must be
                original. Full rulebook available on registration.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <MedalIcon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="font-headline">Prizes & Perks</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Win cash prizes up to $5000, mentorship from industry experts,
                and incubation opportunities for your startup.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <TrophyIcon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="font-headline">Register Now</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Registrations are now open! Secure your spot and get ready to
                innovate.
              </CardDescription>
              <Button className="mt-4 w-full">Register</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
