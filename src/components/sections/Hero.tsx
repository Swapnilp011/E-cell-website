import { Button } from '@/components/ui/button';
import Image from 'next/image';

export function Hero() {
  return (
    <section className="relative h-[80vh] min-h-[600px] w-full">
      <Image
        src="https://picsum.photos/1920/1080"
        alt="Innovation"
        fill
        priority
        className="object-cover"
        data-ai-hint="innovation technology"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--midnight-blue))] via-black/50 to-transparent" />
      <div className="relative container flex h-full flex-col items-center justify-center text-center text-primary-foreground">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          Fueling the Next Wave of Innovation
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-primary-foreground/80 md:text-xl">
          E-Cell IICT is a student-run organization dedicated to fostering the
          spirit of entrepreneurship and innovation among students.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <a href="#events">Explore Events</a>
          </Button>
          <Button size="lg" variant="secondary">
            Join Us
          </Button>
        </div>
      </div>
    </section>
  );
}
