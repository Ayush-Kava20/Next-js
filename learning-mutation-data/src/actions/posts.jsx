'use server';

import { uploadImage } from '@/src/services/repositories/cloudinary';
import {
  storePost,
  updatePostLikeStatus,
} from '@/src/services/repositories/posts';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function handleAction(prevState, formData) {
  const title = formData.get('title');
  const image = formData.get('image');
  const content = formData.get('content');

  let errors = [];

  if (!title || title.trim().length === 0) {
    errors.push('Title is required!');
  }

  if (!image || image.size === 0) {
    errors.push('Image is required!');
  }

  if (!content || content.trim().lenght === 0) {
    errors.push('content is required!');
  }

  if (errors.length > 0) {
    return { errors };
  }
  let imageUrl;

  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error('Error uploadin an image', error);
  }

  await storePost({
    imageUrl: imageUrl,
    title: title,
    content: content,
    userId: 1,
  });

  redirect('/feed');
}

export async function likeAction(postId) {
  await updatePostLikeStatus(postId, 2);
  revalidatePath('/feed');
}
