import PostHeader from './post-header';
import Markdown from 'react-markdown';

export default function PostContent(props: { post: any }) {
  const { post } = props;
  const imagePath = `/images/posts/${post.image}`;

  return (
    <article className="max-w-3xl mx-auto p-4 flex flex-col items-center">
      <div>
        <PostHeader title={post.title} image={imagePath} />
      </div>
      <div className="w-full mt-10 bg-amber-50 text-black p-6 rounded-lg shadow-md">
        <Markdown>{post.content}</Markdown>
      </div>
    </article>
  );
}
