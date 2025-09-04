'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase/client';
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

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
        {!loading && user && <Team />}
        <LeadershipVoice />
      </main>
      <Footer />
    </div>
  );
}
