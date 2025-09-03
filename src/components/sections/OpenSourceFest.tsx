import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { CodeIcon, MicIcon, HammerIcon } from 'lucide-react';

export function OpenSourceFest() {
  return (
    <section id="osf" className="w-full bg-card py-12 md:py-24 lg:py-32">
      <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
        <div className="space-y-4">
          <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
            Open-Source Fest
          </div>
          <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Celebrate, Build, and Learn with Open Source
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our Open-Source Fest is a month-long celebration of open-source
            software, featuring hackathons, workshops, and talks from leading
            figures in the open-source community.
          </p>
          <ul className="grid gap-4 py-4">
            <li className="flex items-center gap-4">
              <div className="rounded-full bg-accent/10 p-2">
                <HammerIcon className="h-5 w-5 text-accent" />
              </div>
              <span className="font-medium">
                Hackathons on real-world projects
              </span>
            </li>
            <li className="flex items-center gap-4">
              <div className="rounded-full bg-accent/10 p-2">
                <CodeIcon className="h-5 w-5 text-accent" />
              </div>
              <span className="font-medium">
                Workshops on cutting-edge technologies
              </span>
            </li>
            <li className="flex items-center gap-4">
              <div className="rounded-full bg-accent/10 p-2">
                <MicIcon className="h-5 w-5 text-accent" />
              </div>
              <span className="font-medium">
                Inspiring talks from industry experts
              </span>
            </li>
          </ul>
          <Button>Learn More</Button>
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
