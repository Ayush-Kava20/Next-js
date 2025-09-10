import PostForm from '@/src/components/post-form';
import { handleAction } from '@/src/actions/posts';

export default function NewPostPage() {
  return <PostForm formState={handleAction} />;
}
