import PostItem from './PostItem';

export default function PostGrid({ posts }: { posts: any[] }) {
  
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostItem key={post.slug} post={post} />
        ))}
    </ul>
  )
}
