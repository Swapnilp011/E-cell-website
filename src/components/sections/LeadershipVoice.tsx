import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

export function LeadershipVoice() {
  const testimonials = [
    {
      name: 'Kartik D. Sakhare',
      handle: '@Kartik',
      role: 'Team Head, E-Cell IICT',
      testimonial:
        'Being the Head of E-Cell IICT has been a transformative experience. Our goal is to nurture entrepreneurship and innovation, and seeing the enthusiasm among students is truly inspiring. Each event we conduct feels like a step towards a brighter future for young innovators.',
      imageUrl: 'https://picsum.photos/100/100?random=1',
      dataAiHint: 'person smiling',
    },
    {
      name: 'Abhay K. Chonde',
      handle: '@Abhay',
      role: 'Vice-Head, E-Cell IICT',
      testimonial:
        'As the Vice-Head, I am constantly amazed by the potential of our team and the students we work with. Our events have shown how eager students are to develop their skills. It\'s a privilege to be a part of this journey.',
      imageUrl: 'https://picsum.photos/100/100?random=2',
      dataAiHint: 'person professional',
    },
  ];

  return (
    <section id="leadership-voice" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
              Leadership Voice
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
              What Our Leads Say
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-card">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Quote className="h-8 w-8 text-primary" />
                  <p className="flex-1 text-muted-foreground">
                    {testimonial.testimonial}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={testimonial.imageUrl}
                      alt={testimonial.name}
                      data-ai-hint={testimonial.dataAiHint}
                    />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg font-bold">
                      {testimonial.name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {testimonial.role} &middot;{' '}
                      <span className="text-accent">{testimonial.handle}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}