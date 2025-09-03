import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CodeIcon, MicIcon, HammerIcon } from 'lucide-react';
import Link from 'next/link';

export function OpenSourceFest() {
  return (
    <section id="osf" className="w-full bg-card py-12 md:py-24 lg:py-32">
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-4">
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
            Collaborative Event
          </div>
          <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Opn-Source Fest
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            A celebration of the open-source spirit. Join developers,
            designers, and tech enthusiasts to learn, build, and contribute to
            impactful open-source projects.
          </p>
          <ul className="grid gap-4 py-4">
            <li className="flex items-center gap-4">
              <div className="rounded-full bg-accent/10 p-2">
                <HammerIcon className="h-5 w-5 text-accent" />
              </div>
              <span className="font-medium">
                Project Hackathons on real-world projects
              </span>
            </li>
            <li className="flex items-center gap-4">
              <div className="rounded-full bg-accent/10 p-2">
                <CodeIcon className="h-5 w-5 text-accent" />
              </div>
              <span className="font-medium">
                Expert Workshops on Git, Docker, CI/CD
              </span>
            </li>
            <li className="flex items-center gap-4">
              <div className="rounded-full bg-accent/10 p-2">
                <MicIcon className="h-5 w-5 text-accent" />
              </div>
              <span className="font-medium">
                Inspiring Talks from FOSS community leaders
              </span>
            </li>
          </ul>
          <Button asChild>
            <Link href="#">Join the Fest</Link>
          </Button>
        </div>
        <Image
          src="https://picsum.photos/600/600"
          width={600}
          height={600}
          alt="Open Source Fest"
          className="mx-auto aspect-square overflow-hidden rounded-full object-cover"
          data-ai-hint="open source code"
        />
      </div>
    </section>
  );
}