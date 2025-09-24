import Image from 'next/image';
export default function PostHeader(props: { title: string; image: string }) {
  const { title, image } = props;

  return (
    <header className="w-full h-auto">
        <div className='w-[300px] h-[300px] relative mx-auto'>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover w-full h-full"
          />
        </div>
        <h1 className='text-3xl font-bold text-center my-3'>
          {title}
        </h1>
    </header>
  );
}
