import Head from 'next/head';
import Hero from '@/components/home-page/Hero';
import FeaturedPosts from '@/components/home-page/FeaturedPosts';
import { getFeaturedPosts } from '@/lib/post-utill';
import { Fragment } from 'react';

export default function HomePage(props: { posts: any[] }) {
  return (
    <Fragment>
      <Head>  
        <title>Aysuh's Blog</title>
        <meta name="description" content="Welcome to my blog where I share insights on web development, programming, and technology trends." />
      </Head>
      <main className="mt-8">
        <Hero />
        <FeaturedPosts posts={props.posts} />
      </main>
    </Fragment>
  );
}

export async function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}
