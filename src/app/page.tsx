'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { useFirebaseAuth } from '@/hooks/use-firebase-auth';
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
import { LoadingIndicator } from '@/components/layout/LoadingIndicator';

export default function HomePage() {
  const { auth } = useFirebaseAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
        setLoading(false);
        return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);
  
  if (loading) {
    return <LoadingIndicator />;
  }

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
        <LeadershipVoice />
        {!loading && user && <Team />}
      </main>
      <Footer />
    </div>
  );
}
