import Head from "next/head";
import AllPosts from "@/components/posts/AllPosts";
import { getAllPosts } from "@/lib/post-utill"
import { Fragment } from "react";

export default function AllPostPage(props: {posts: any[]}) {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta name="description" content="A list of all blog posts" />
      </Head>
      <AllPosts posts={props.posts} />
    </Fragment>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {
      posts
    }
  }
}