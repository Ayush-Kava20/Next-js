import PostHeader from './post-header';
import ReactMarkdown, { Components } from 'react-markdown';
import Image from 'next/image';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {atomDark} from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function PostContent(props: { post: any }) {
  const { post } = props;
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers: Components = {
    img(image: any) {
      return (
        <Image
          src={`/images/posts/${post.slug}/${image.src}`}
          alt={image.alt}
          width={600}
          height={400}
        />
      );
    },
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mt-6 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-medium mt-4 mb-2">{children}</h3>
    ),
    p: ({ children }) => <p className="my-2">{children}</p>,
    li: ({ children }) => <li className="ml-6 list-disc my-1">{children}</li>,

    code(code: any){
      const {className, children} = code;
      const language = className.split('-')[1]; 

      return (
        <SyntaxHighlighter language={language} style={atomDark} children={children} />
      );
    }
  };

  return (
    <article className="mx-auto flex flex-col items-center">
      <div className="w-full bg-amber-50 text-black p-6 rounded-lg shadow-md">
        <div>
          <PostHeader title={post.title} image={imagePath} />
        </div>
        <article>
          <ReactMarkdown components={customRenderers}>
            {post.content}
          </ReactMarkdown>
        </article>
      </div>
    </article>
  );
}
