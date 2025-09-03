import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

export function About() {
  const principles = [
    'Lean Startup',
    'Agile Development',
    'Disruptive Tech',
    'Design Thinking',
    'Data-Driven Decisions',
    'User-Centricity',
  ];

  return (
    <section id="about" className="w-full bg-card py-12 md:py-24 lg:py-32">
      <div className="container grid items-center gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-24">
        <div className="space-y-4">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
            About Us
          </h2>
          <p className="text-muted-foreground md:text-xl/relaxed">
            E-Cell IICT, the Entrepreneurship Cell of the Institute of
            Information & Communication Technology MGM Aurangabad, is a
            catalyst for change, driven by a passion for innovation and a
            commitment to nurturing future leaders. Our mission is to provide
            fertile ground where extraordinary ideas can flourish.
          </p>
          <div className="space-y-2">
            <h3 className="font-headline text-xl font-bold">Our Affiliation</h3>
            <p className="text-muted-foreground">
              We are proud to be a part of the National Entrepreneurship
              Challenge (NEC), a pan-India initiative conducted by E-Cell, IIT
              Bombay. This connection empowers us to bring national-level
              opportunities and resources to our campus, fostering a culture of
              high-impact entrepreneurship.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-headline text-xl font-bold">
              Here are a few principles we believe in:
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              {principles.map((principle, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">{principle}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Image
            src="https://picsum.photos/600/400"
            alt="E-Cell Team Collaboration"
            width={600}
            height={400}
            className="rounded-lg object-cover shadow-lg"
            data-ai-hint="team collaboration"
          />
        </div>
      </div>
    </section>
  );
}