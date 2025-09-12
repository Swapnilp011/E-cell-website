
import { NextRequest, NextResponse } from 'next/server';
import admin from '@/lib/firebase/admin';

export async function GET(req: NextRequest) {
  try {
    const authToken = req.headers.get('authorization')?.split('Bearer ')[1];
    if (!authToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = await admin.auth().verifyIdToken(authToken);
    const userId = decodedToken.uid;

    const userDoc = await admin.firestore().collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(userDoc.data());
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authToken = req.headers.get('authorization')?.split('Bearer ')[1];
    if (!authToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = await admin.auth().verifyIdToken(authToken);
    const userId = decodedToken.uid;

    const profile = await req.json();

    await admin.auth().updateUser(userId, {
      displayName: profile.name,
    });

    await admin.firestore().collection('users').doc(userId).set(profile, { merge: true });

    const updatedUserDoc = await admin.firestore().collection('users').doc(userId).get();
    
    return NextResponse.json(updatedUserDoc.data());
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
