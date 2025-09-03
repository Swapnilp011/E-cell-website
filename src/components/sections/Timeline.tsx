export function Timeline() {
  const events = [
    {
      year: '2020',
      title: 'Inception of E-Cell IICT',
      description:
        'The journey began with a small group of passionate students aiming to build an entrepreneurial ecosystem.',
    },
    {
      year: '2021',
      title: 'First Eureka Ideathon',
      description:
        'Successfully hosted our first major event, attracting over 200 participants from across the country.',
    },
    {
      year: '2022',
      title: 'Launched Mentorship Program',
      description:
        'Connected aspiring student entrepreneurs with experienced industry mentors.',
    },
    {
      year: '2023',
      title: 'Inaugural Open-Source Fest',
      description:
        'Celebrated the spirit of open source with a month-long festival of coding and learning.',
    },
    {
      year: '2024',
      title: 'Expanded to 50+ Members',
      description:
        'Grew our team and increased our impact on campus and beyond.',
    },
  ];

  return (
    <section id="timeline" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container max-w-3xl">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
              Our Journey
            </div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              Milestones & Achievements
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              A look back at the key moments that have shaped E-Cell IICT into
              what it is today.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>
          {events.map((event, index) => (
            <div key={index} className="relative pb-8 pl-12">
              <div className="absolute top-1 left-4 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-background bg-primary"></div>
              <div className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:shadow-primary/20">
                <p className="mb-1 text-sm font-semibold text-accent">
                  {event.year}
                </p>
                <h4 className="font-headline text-lg font-bold">
                  {event.title}
                </h4>
                <p className="mt-2 text-sm text-muted-foreground">
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
