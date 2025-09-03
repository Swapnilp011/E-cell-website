import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function OtherInitiatives() {
  const initiatives = [
    {
      title: "E-Summit",
      description: "A grand conclave of entrepreneurs, investors, and students, with keynotes, panels, and networking opportunities.",
      badge: "Coming Soon",
      badgeVariant: "secondary",
      category: "Summit"
    },
    {
      title: "Innovator's Talk Series",
      description: "A monthly series where we invite successful founders and industry experts to share their journey and insights.",
      badge: "Monthly",
      badgeVariant: "outline",
      category: "Webinar"
    },
    {
      title: "Startup Workshops",
      description: "Hands-on workshops covering essential startup skills like business model canvas, financial modeling, and pitching.",
      badge: "Bi-Monthly",
      badgeVariant: "outline",
      category: "Workshop"
    }
  ];

  return (
    <section id="other-initiatives" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container">
        <div className="mb-12 flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">
            Other Initiatives
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {initiatives.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{item.title}</CardTitle>
                  <Badge variant={item.badgeVariant as any}>{item.badge}</Badge>
                </div>
                <CardDescription className="text-primary">{item.category}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}