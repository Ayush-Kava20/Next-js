import Link from 'next/link';
import { DUMMY_NEWS } from '@/dummy-news';
import NewsList from '@/src/components/news-list';

export default function NewsPage() {
  return (
    <>
      <h1>Todays Newss is hereee!!!</h1>
      <NewsList news={DUMMY_NEWS} />
    </>
  );
}
