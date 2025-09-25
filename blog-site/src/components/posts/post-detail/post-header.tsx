import Image from 'next/image';
export default function PostHeader(props: { title: string; image: string }) {
  const { title, image } = props;

  return (
    <header className="w-full h-auto flex border justify-between px-20 items-center p-4 bg-conic-330 rounded-lg shadow-md">
        <h1 className='text-3xl font-bold text-center my-3 flex items-center'>
          {title}
        </h1>
        <div className='w-[400px] h-[300px] relative'>
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover w-full h-full"
          />
        </div>
    </header>
  );
}
