import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full">
      <Image
        src="https://picsum.photos/1920/1080"
        alt="E-Cell IICT Eureka"
        fill
        priority
        className="object-cover"
        data-ai-hint="innovation technology"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-transparent" />
      <div className="relative container flex h-full flex-col items-center justify-center text-center text-primary-foreground">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Fostering the Next Generation of Innovators
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-primary-foreground/80 md:text-xl">
          E-Cell IICT Eureka, MGM University
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="#events">Explore Events</Link>
          </Button>
          <Button size="lg" variant="secondary" asChild>
            <Link href="#team">Join Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
