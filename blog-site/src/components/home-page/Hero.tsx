import Image from 'next/image';

export default function Hero() {
  return (
    <section className="p-8 text-center flex flex-col items-center">
      <h1 className="text-4xl font-bold">Welcome to My Blog</h1>
      <div className="hero-image my-4 w-[300px] h-[300px] rounded-full border-4 overflow-hidden shadow-lg">
        <Image
          src="/images/site/profile.jpg"
          alt="My Blog"
          width={300}
          height={300}
          className="object-cover rounded-full"
        />
      </div>
      <p className="text-lg">
        This is a blog about web development, programming, and technology.
      </p>
    </section>
  );
}
