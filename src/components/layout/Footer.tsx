import Image from 'next/image';
import Link from 'next/link';

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
              <Image
                src="https://picsum.photos/200/100"
                alt="E-Cell IIT Bombay"
                width={150}
                height={75}
                className="object-contain"
                data-ai-hint="logo iit bombay"
              />
            </Link>
            <Link
              href="https://www.mgmu.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="grayscale transition-all hover:grayscale-0"
            >
              <Image
                src="https://picsum.photos/200/100"
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
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} E-Cell IICT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
