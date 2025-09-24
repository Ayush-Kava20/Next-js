import PostGrid from "../posts/PostGrid"

export default function FeaturedPosts(props: {posts: any[]}) {
    return(
        <section className="flex flex-col items-center mt-20 ">
            <h2 className="text-3xl font-bold mb-5">Featured Posts</h2>
            <PostGrid posts={props.posts} />
        </section>
    )
}