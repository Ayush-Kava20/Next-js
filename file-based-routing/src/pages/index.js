import { getFeaturedEvents } from '../services/api/get-data';
import EventList from '../components/events/event-list';
import Head from 'next/head';

export default function HomePage(props) {
  const { featuredEvent} = props;

  return (
    <div>
      <Head>
        <title>Next Events</title>
        <meta name="description" content="Find a lot of great events that allow you to evolve..." />
      </Head>
      <EventList items={featuredEvent} />
    </div>
  );
}

export async function getStaticProps() {
    const featuredEvent = await getFeaturedEvents();

    return {
      props: {
        featuredEvent
      },
      revalidate: 120 
    }
}