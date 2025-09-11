import { redirect } from 'next/navigation';
import { addMessage } from '@/src/services/repositories/messages';
import { revalidateTag } from 'next/cache';
import fs from 'fs';
import path from 'path';

export const metadata = {
  title: 'New Message',
  description: 'Create a new message',
};

export default async function NewMessagePage() {
  async function createMessage(formData) {
    'use server';

    const file = formData.get('image');
    let imagePath = null;
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${file.name}`;
      const filePath = path.join(process.cwd(), 'public', 'uploads', fileName);

      fs.writeFileSync(filePath, buffer);
      imagePath = `/uploads/${fileName}`;
    }

    const message = {
      text: formData.get('message'),
      image: imagePath,
    };
    addMessage(message);
    revalidateTag('msg');
    redirect('/messages');
  }

  return (
    <>
      <h2>New Message</h2>
      <form action={createMessage}>
        <p className="form-control">
          <label htmlFor="message">Your Message</label>
          <textarea id="message" name="message" required rows="5" />
        </p>
        <p className="form-control">
          <label htmlFor="image">Enter your image</label>
          <input type="file" id="image" name="image" accept="image/*" />
        </p>

        <p className="form-actions">
          <button type="submit">Send</button>
        </p>
      </form>
    </>
  );
}
