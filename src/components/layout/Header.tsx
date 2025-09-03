import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EcellLogo } from '../icons/EcellLogo';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/" className="mr-6 flex items-center gap-2">
          <EcellLogo className="h-8 w-8" />
          <span className="font-headline text-lg font-bold">E-Cell IICT</span>
        </Link>
        <nav className="hidden flex-1 items-center gap-4 text-sm font-medium md:flex">
          <Link
            href="/#about"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            About
          </Link>
          <Link
            href="/#timeline"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Timeline
          </Link>
          <Link
            href="/#eureka"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Eureka
          </Link>
          <Link
            href="/#osf"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Opn-Source
          </Link>
          <Link
            href="/#events"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Events
          </Link>
          <Link
            href="/#team"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Team
          </Link>
        </nav>
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button asChild variant="ghost">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/register">Register</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
