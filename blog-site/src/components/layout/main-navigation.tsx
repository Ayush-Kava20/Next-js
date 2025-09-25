import Link from 'next/link';

export default function MainNavigation() {
  return (
    <header className="main-header text-white p-4 flex justify-between items-center h-20 text-xl ">
      <h1 className="text-2xl font-bold">
        <Link href="/">My Blog</Link>
      </h1>
      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/posts" className="hover:underline">
              Posts
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
