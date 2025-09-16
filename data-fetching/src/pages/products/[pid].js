import { Fragment } from 'react';
import path from 'path';
import fs from 'fs/promises';

export default function ProductDetailPage(props) {
  const product = props.product;

  if (!product) {
    return <h1>Loading...</h1>; 
  }

  return (
    <Fragment>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), 'src', 'dummy-data.json');
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const pid = context.params.pid;
  const data = await getData();

  if (!data) {
    return { notFound: true };
  }

  const product = data.products.find((product) => product.id === pid);
  if(!product){
    return { notFound: true}
  }
  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  // return {
  //   paths: [
  //       {params: { pid: 'p1' }},
  //   ],
  //   fallback: true,
  // };
  const data = await getData();

  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: pathsWithParams,
    fallback: true
  };
}
