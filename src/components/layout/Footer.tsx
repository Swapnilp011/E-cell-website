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
          <div className="flex flex-wrap items-center justify-center gap-12">
            <Link
              href="https://www.ecell.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-foreground transition-opacity hover:opacity-80"
            >
              <ECellIITBombayLogo className="h-[60px] w-[120px]" />
            </Link>
            <Link
              href="https://www.mgmu.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 text-foreground transition-opacity hover:opacity-80"
            >
              <Image
                src="https://cdn.mgmtech.org/static/mgmu.ac.in/assets/images/LogoMGM.svg"
                alt="MGM University, Aurangabad"
                width={120}
                height={60}
                className="object-contain"
              />
              <span className="text-left font-medium">
                MGM University,
                <br />
                Aurangabad
              </span>
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
