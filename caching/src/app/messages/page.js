import Messages from '@/src/components/messages';
import { getMessages } from '@/src/services/repositories/messages';

// export const revalidate = 5
// export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Messages',
  description: 'List of all messages',
}

export default async function MessagesPage() {
  // const response = await fetch('http://localhost:8080/messages',{
  //   next: {
  //     tags: ['msg']
  //   }
  // });
  // const response = await fetch('http://localhost:8080/messages',{
  //   // next: {
  //   //   revalidate: 5
  //   // }
  // });
  // const messages = await response.json();.
  const messages = await getMessages();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
