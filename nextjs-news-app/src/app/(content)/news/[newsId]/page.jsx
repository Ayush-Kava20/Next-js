import { DUMMY_NEWS } from "@/dummy-news"
import { getNewsItem } from "@/src/lib/news";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function NewsDetailPage({params}){
    // const newsItem = DUMMY_NEWS.find((item) => item.id === params.newsId );
    const newsItem = await getNewsItem(params.newsId);
    
    if(!newsItem){
        notFound()
    }

    return (
        <article className="news-article">
            <header>
                <Link href={`/news/${newsItem.id}/image`}>
                    <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
                </Link>
                {/* <button>
                    <a href={`/news/${newsItem.id}/image`}>Go to full screen</a>
                </button> */}
                <h1>{newsItem.title}</h1>
                <time dateTime={newsItem.date}>{newsItem.date}</time>
            </header>
            <p>{newsItem.content}</p>
        </article>
    )
}