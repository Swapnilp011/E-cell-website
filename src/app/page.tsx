import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Eureka } from '@/components/sections/Eureka';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <div id="events" className="scroll-mt-20">
          <Eureka />
        </div>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              Ready to Dive In?
            </h2>
            <p className="mx-auto my-4 max-w-[700px] text-muted-foreground md:text-xl">
              Explore all our events, meet the team, and see what we've been up to.
            </p>
            <Button size="lg" asChild>
              <Link href="/home">Explore Full Site</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
