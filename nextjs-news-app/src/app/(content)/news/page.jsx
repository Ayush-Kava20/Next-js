import Link from 'next/link';
// import { DUMMY_NEWS } from '@/dummy-news';
import NewsList from '@/src/components/news-list';
import { getAllNews } from '@/src/lib/news';

export default async function NewsPage() {
  const news = await getAllNews();

  return (
    <>
      <h1>Todays Newss is hereee!!!</h1>
      <NewsList news={news} />
    </>
  );
}
