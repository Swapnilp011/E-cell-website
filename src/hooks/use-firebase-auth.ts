'use client';

import {auth} from '@/lib/firebase/client';

export function useFirebaseAuth() {
  return {auth};
}
