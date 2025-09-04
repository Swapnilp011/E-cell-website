'use client';

import {app, auth} from '@/lib/firebase/client';
import {onAuthStateChanged} from 'firebase/auth';

export function useFirebaseAuth() {
  return {auth: auth, onAuthStateChanged};
}
