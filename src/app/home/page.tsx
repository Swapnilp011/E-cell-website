import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Timeline } from '@/components/sections/Timeline';
import { Eureka } from '@/components/sections/Eureka';
import { OpenSourceFest } from '@/components/sections/OpenSourceFest';
import { OtherInitiatives } from '@/components/sections/OtherInitiatives';
import { LeadershipVoice } from '@/components/sections/LeadershipVoice';
import { Team } from '@/components/sections/Team';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Timeline />
        <div id="events" className="scroll-mt-20">
          <Eureka />
          <OpenSourceFest />
        </div>
        <OtherInitiatives />
        <Team />
        <LeadershipVoice />
      </main>
      <Footer />
    </div>
  );
}
