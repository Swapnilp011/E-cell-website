
import { NextRequest, NextResponse } from 'next/server';
import admin from '@/lib/firebase/admin';
import { promises as fs } from 'fs';
import formidable from 'formidable';
import { randomUUID } from 'crypto';

// This is a helper function to parse the form data
const parseForm = async (req: NextRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    const contentType = req.headers.get('content-type');
    if (!contentType) {
        throw new Error('No content type');
    }
    const chunks = [];
    for await (const chunk of req.body as any) {
        chunks.push(chunk);
    }
    const body = Buffer.concat(chunks);

    return new Promise((resolve, reject) => {
        const form = formidable({
            maxFiles: 1,
            maxFileSize: 1024 * 1024 * 5, // 5MB
        });
        form.parse(body, (err, fields, files) => {
            if (err) {
                reject(err);
            }
            resolve({ fields, files });
        });
    });
};

export async function POST(req: NextRequest) {
    try {
        const { fields, files } = await parseForm(req);
        const { title, content } = fields;
        const imageFile = files.image;

        if (!title || !content || !imageFile) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const authToken = req.headers.get('authorization')?.split('Bearer ')[1];
        if (!authToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const decodedToken = await admin.auth().verifyIdToken(authToken);
        if (!decodedToken.admin || decodedToken.email !== 'iictmgmustudent@gmail.com') {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }
        const bucket = admin.storage().bucket(`gs://${process.env.FIREBASE_PROJECT_ID}.appspot.com`);
        const imageFileName = `${randomUUID()}-${(imageFile as formidable.File).originalFilename}`;
        const imagePath = (imageFile as formidable.File).filepath;

        await bucket.upload(imagePath, {
            destination: `news/${imageFileName}`,
        });

        await fs.unlink(imagePath);

        const imageUrl = `https://storage.googleapis.com/${bucket.name}/news/${imageFileName}`;

        await admin.firestore().collection('news').add({
            title: Array.isArray(title) ? title[0] : title,
            content: Array.isArray(content) ? content[0] : content,
            imageUrl,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        return NextResponse.json({ message: 'News article created successfully' });
    } catch (error) {
        console.error('Error creating news article:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
