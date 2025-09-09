import { DUMMY_NEWS } from "@/dummy-news";
import { getNewsItem } from "@/src/lib/news";
import { notFound } from "next/navigation";

export default async function Image({params}) {
  // const newsItem = DUMMY_NEWS.find((item) => item.id === params.newsId);
  const newsItem = await getNewsItem(params.newsId);

  if (!newsItem) {
    notFound();
  }
  return <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
}
