import path from 'path';
import fs from 'fs/promises';
import Link from 'next/link';

function HomePage(props) {
  const products = props.products;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>
            {product.title} 
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default HomePage;

export async function getStaticProps() {
  console.log('Revalidating...');

  const filePath = path.join(process.cwd(), 'src', 'dummy-data.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}
