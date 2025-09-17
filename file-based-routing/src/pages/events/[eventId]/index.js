import { useRouter } from 'next/router';
import { Fragment } from 'react/jsx-runtime';
import getAllEvents , { getEventById } from  '@/services/api/get-data';
import EventSummary from '@/components/event-detail/event-summary';
import EventLogistics from '@/components/event-detail/event-logistics';
import EventContent from '@/components/event-detail/event-content';
import Comments from '@/components/input/comments';

export default function EventDetailPage(props) {
  const router = useRouter();
  const event = props.event;

  if (!event) {
    return <p>No event found!</p>;
  }
  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
      <Comments eventId={event.id}/>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { eventId } = context.params;

  const event = await getEventById(eventId);
  if(!event){
    return { notFound: true }
  }

  return {
    props: {
      event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths(){
  const events = await getAllEvents();
  const paths = events.map(event => ({params: {eventId: event.id}}))

  return {
    paths: paths,
    fallback: 'blocking'
  }
}