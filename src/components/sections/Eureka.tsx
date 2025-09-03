import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrophyIcon, LightbulbIcon, UsersIcon } from 'lucide-react';
import Link from 'next/link';

export function Eureka() {
  return (
    <section id="eureka" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
              The Flagship Event
            </div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              Eureka
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Eureka is our premier ideathon, a battleground for the brightest
              minds to transform revolutionary ideas into reality. Compete,
              innovate, and get a chance to win from a massive prize pool and
              receive expert mentorship.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-12 grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <TrophyIcon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="font-headline">Massive Prize Pool</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Win substantial cash prizes and resources to kickstart your
                venture.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <LightbulbIcon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="font-headline">Expert Mentorship</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Gain invaluable guidance from seasoned entrepreneurs and
                industry leaders.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="rounded-full bg-primary/10 p-3">
                <UsersIcon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="font-headline">Networking</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Connect with investors, founders, and a community of fellow
                innovators.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="mt-12 flex justify-center">
          <Button asChild size="lg">
            <Link href="#">Register for Eureka</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
