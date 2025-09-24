import PostContent from "@/components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "@/lib/post-utill";

export default function PostDetailsPage(props: any){
    return(
        <PostContent post={props.post} />
    )
}

export async function getStaticProps(context: any) {
    const { params } = context;
    const { slug } = params;
    const post = getPostData(slug);

    return {
        props: {
            post: post || null
        }
    }
}

export function getStaticPaths() {
    const postFileNames = getPostsFiles();

    const slugs = postFileNames.map((fileName) => fileName.replace(/\.md$/, ""));

    return {
        paths: slugs.map((slug) => ({ params: { slug: slug } })),
        fallback: false,
    };  
}