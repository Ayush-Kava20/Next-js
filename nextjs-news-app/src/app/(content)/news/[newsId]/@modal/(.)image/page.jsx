// 'use client'
import { DUMMY_NEWS } from '@/dummy-news';
import { getNewsItem } from '@/src/lib/news';
import { notFound, useRouter } from 'next/navigation';
import ModalBackdrop from './ModalBackdrop';

export default async function InterseptedImagePage({ params }) {

  // const newsItem = DUMMY_NEWS.find((item) => item.id === params.newsId);
  const newsItem = await getNewsItem(params.newsId);

  if (!newsItem) {
    notFound()
  }

  return (
    <>
      <ModalBackdrop />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
}
