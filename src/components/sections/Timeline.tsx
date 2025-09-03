export function Timeline() {
  const events = [
    {
      date: '28 July 2024',
      title: 'Foundation of E-Cell IICT',
      location: 'Institute of Chemical Technology, Mumbai',
      description:
        'The Entrepreneurship Cell was officially established at UDICT, ICT Mumbai. Core objectives set to foster innovation and entrepreneurial mindset among students. Initial core team formation and planning for the academic year.',
    },
    {
      date: '1 September 2024',
      title: 'Launch Event',
      location: 'E-Cell IICT',
      description:
        'Introduction of E-Cell IICT to students, discussing the mission, vision, and upcoming plans. Engaged over 100 students from various departments. Conducted a session on entrepreneurship and innovation.',
    },
    {
      date: '15 September 2024',
      title: 'QR Quest & Srujan',
      location: 'Ideation Contest',
      description:
        'A fun-filled QR code hunt across the campus to promote entrepreneurial thinking. Srujan, an idea-pitching competition, saw participation from over 50 teams. Winners were awarded seed funding and mentorship opportunities.',
    },
  ];

  return (
    <section id="timeline" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container max-w-3xl">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              Achievements and initiatives.
            </h2>
          </div>
        </div>
        <div className="relative">
          <div className="absolute left-4 top-0 h-full w-0.5 -translate-x-1/2 bg-border"></div>
          {events.map((event, index) => (
            <div key={index} className="relative pb-8 pl-12">
              <div className="absolute top-1 left-4 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-background bg-primary"></div>
              <div className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md hover:shadow-primary/20">
                <p className="mb-1 text-sm font-semibold text-accent">
                  {event.date}
                </p>
                <h4 className="font-headline text-lg font-bold">
                  {event.title}
                </h4>
                <p className="mb-2 text-sm text-muted-foreground">
                  {event.location}
                </p>
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
