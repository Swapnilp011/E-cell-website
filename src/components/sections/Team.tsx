import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

export function Team() {
  const teamMembers = [
    {
      name: 'Kartik D. Sakhare',
      role: 'Head',
      description:
        'The strategic visionary steering the E-Cell ship. Kartik blends leadership with friendship, ensuring the squad not only meets deadlines but also thrives in a collaborative and inspiring environment. He keeps the chaos classy and the team motivated.',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop',
      dataAiHint: 'person smiling',
    },
    {
      name: 'Abhay K. Chonde',
      role: 'Vice-Head',
      description:
        "The silent strategist turning ambitious plans into actionable results. Abhay's sharp instincts and operational expertise are the bedrock of our execution, providing the clarity and direction needed to navigate complex challenges and keep the team buzzing.",
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop',
      dataAiHint: 'person professional',
    },
    {
      name: 'Sahil N. Jadhav',
      role: 'Tech Head',
      description:
        'The wizard behind the wires and the architect of our digital presence. Sahil leads the technical team, transforming ideas into flawless websites and applications. His expertise in modern web technologies ensures our digital experiences are always world-class.',
      imageUrl: 'https://images.unsplash.com/photo-1489980557514-251d61e3e861?q=80&w=200&h=200&fit=crop',
      dataAiHint: 'person glasses',
    },
    {
      name: 'Vikas V. Hiwale',
      role: 'Event Head',
      description:
        'The master of execution who makes every event an unforgettable experience. Vikas handles the end-to-end logistics and coordination, ensuring that from ideation to wrap-up, every detail is flawlessly managed. He is the bar for event organization.',
      imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&fit=crop',
      dataAiHint: 'man serious',
    },
    {
      name: 'Sakshi D. Gadekar',
      role: 'Social Media Head',
      description:
        'The mind behind the moodboard and the voice of our online brand. Sakshi crafts our digital narrative, dancing with algorithms to build an engaged community. Her strategies ensure our message resonates across all social platforms.',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop',
      dataAiHint: 'woman portrait',
    },
    {
      name: 'Janhavi S. Mahamune',
      role: 'PR Head',
      description:
        'The powerhouse of influence and communication. Janhavi builds bridges with media and partners, shaping our public image with flair and focus. She ensures our story is told compellingly and reaches the right audience.',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&fit=crop',
      dataAiHint: 'woman professional',
    },
    {
      name: 'Krushna G. Bhosle',
      role: 'Video Creation & Editing Head',
      description:
        "Our master storyteller in motion. Krushna crafts compelling narratives from raw footage, producing high-impact videos that captivate our audience. He doesn't just edit clips; he directs the visual heartbeat of our content.",
      imageUrl: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=200&h=200&fit=crop',
      dataAiHint: 'man creative',
    },
    {
      name: 'Siya P. Lahoti',
      role: 'Graphic Designer',
      description:
        "The visual architect who defines our brand's aesthetic. Siya transforms blank canvases into branded brilliance, ensuring every design is not just beautiful but also strategically aligned with our mission. She designs the vibe of E-Cell.",
      imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&fit=crop',
      dataAiHint: 'woman artistic',
    },
  ];

  return (
    <section id="team" className="w-full bg-card py-12 md:py-24 lg:py-32">
      <div className="container">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              Meet the Core Team
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              The driving force behind E-Cell IICT. Meet the dedicated
              individuals who make it all happen.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="group transform text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/30"
            >
              <CardContent className="relative flex flex-col items-center p-6">
                <Avatar className="mb-4 h-24 w-24 border-2 border-primary">
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="font-headline text-xl font-bold">
                  {member.name}
                </h3>
                <p className="text-primary">{member.role}</p>
                <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/80 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="text-center text-sm text-primary-foreground">
                    {member.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
