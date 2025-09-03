import Image from 'next/image';
import Link from 'next/link';
import { ECellIITBombayLogo } from '../icons/ECellIITBombayLogo';
import { Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container">
        <div className="mb-8 flex flex-col items-center text-center">
          <h3 className="mb-4 font-headline text-2xl font-bold">
            Proudly Affiliated With
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8">
            <Link
              href="https://www.ecell.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="grayscale transition-all hover:grayscale-0"
            >
              <ECellIITBombayLogo className="h-[75px] w-[150px]" />
            </Link>
            <Link
              href="https://www.mgmu.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="grayscale transition-all hover:grayscale-0"
            >
              <Image
                src="https://images.unsplash.com/photo-1516709325695-3e6989437151?q=80&w=200&h=100&fit=crop"
                alt="MGM University, Aurangabad"
                width={150}
                height={75}
                className="object-contain"
                data-ai-hint="logo university"
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t pt-6 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Designed & Built by E-Cell IICT Tech Team
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://www.instagram.com/e_cell_iict/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Instagram className="h-6 w-6" />
              <span className="sr-only">Instagram</span>
            </Link>
            <Link
              href="https://www.linkedin.com/company/e-cell-iict/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} E-Cell IICT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
