import PostsGrid from './PostGrid';

export default function AllPosts(props: { posts: any[] }) {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8">
      <h1 className='text-4xl font-bold mb-4 text-center'>All Posts</h1>
      <PostsGrid posts={props.posts} />
    </section>
  );
}