import Head from 'next/head';
import PostContent from '@/components/posts/post-detail/post-content';
import { getPostData, getPostsFiles } from '@/lib/post-utill';
import { Fragment } from 'react';

export default function PostDetailsPage(props: any) {
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </Fragment>
  );
}

export async function getStaticProps(context: any) {
  const { params } = context;
  const { slug } = params;
  const post = getPostData(slug);

  return {
    props: {
      post: post || null,
    },
  };
}

export function getStaticPaths() {
  const postFileNames = getPostsFiles();

  const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ''));

  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
}
