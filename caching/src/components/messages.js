import Image from 'next/image';

export default function Messages({ messages }) {
  return (
    <ul className="messages">
      {messages.map((message) => (
        <li key={message.id}>
          <div className='content'>
            <Image
              src={message.image}
              alt="Message Image"
              width={150}
              height={100}
            />
            <p>{message.text}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
