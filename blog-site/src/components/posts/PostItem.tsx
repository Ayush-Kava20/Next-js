import Image from 'next/image';
import Link from 'next/link';
export default function PostItem(props: { post: any }) {
  const { title, excerpt, image, slug, date } = props.post;
  const imagePath = `/images/posts/${image}`;

  return (
    <li className='flex flex-col items-center p-4 border rounded-lg shadow-md'>
      <div className="w-full h-[300px] relative mb-4">
        <Image src={imagePath} alt={title} fill className="object-cover" />
      </div>
      <h3 className='text-lg font-semibold'>{title}</h3>
      <p>{excerpt}</p>
      <time>
        {new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </time>
      <br />
      <Link href={`/posts/${slug}`} className='text-blue-500 hover:underline'>Read More..</Link>
    </li>
  );
}
