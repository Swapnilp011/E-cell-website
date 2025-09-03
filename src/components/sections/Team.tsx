import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

export function Team() {
  const teamMembers = [
    {
      name: 'Alice Johnson',
      role: 'President',
      imageUrl: 'https://picsum.photos/200/200?random=1',
      dataAiHint: 'person smiling',
    },
    {
      name: 'Bob Williams',
      role: 'Vice President',
      imageUrl: 'https://picsum.photos/200/200?random=2',
      dataAiHint: 'person professional',
    },
    {
      name: 'Charlie Brown',
      role: 'Head of Events',
      imageUrl: 'https://picsum.photos/200/200?random=3',
      dataAiHint: 'person glasses',
    },
    {
      name: 'Diana Prince',
      role: 'Marketing Head',
      imageUrl: 'https://picsum.photos/200/200?random=4',
      dataAiHint: 'woman portrait',
    },
    {
      name: 'Ethan Hunt',
      role: 'Technical Lead',
      imageUrl: 'https://picsum.photos/200/200?random=5',
      dataAiHint: 'man serious',
    },
    {
      name: 'Fiona Glenanne',
      role: 'Finance Head',
      imageUrl: 'https://picsum.photos/200/200?random=6',
      dataAiHint: 'woman professional',
    },
  ];

  return (
    <section id="team" className="w-full bg-card py-12 md:py-24 lg:py-32">
      <div className="container">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
              Our Team
            </div>
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              The Minds Behind the Magic
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="transform text-center transition-transform hover:scale-105 hover:shadow-lg hover:shadow-primary/20"
            >
              <CardContent className="flex flex-col items-center p-6">
                <Avatar className="mb-4 h-24 w-24 border-2 border-primary">
                  <AvatarImage
                    src={member.imageUrl}
                    alt={member.name}
                    data-ai-hint={member.dataAiHint}
                  />
                  <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="font-headline text-xl font-bold">
                  {member.name}
                </h3>
                <p className="text-primary">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
