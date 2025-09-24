import Hero from '@/components/home-page/Hero';
import Layout from '@/components/layout/layout';
import FeaturedPosts from '@/components/home-page/FeaturedPosts';
import { getFeaturedPosts } from '@/lib/post-utill';

export default function HomePage(props: {posts: any[]}) {
  return (
    <Layout>
      <main className="mt-8">
        <Hero />
        <FeaturedPosts posts={props.posts} />
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props:{
      posts: featuredPosts
    }
  }
}