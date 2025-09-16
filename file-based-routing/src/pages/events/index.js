import { useRouter } from "next/router";
import { Fragment } from 'react';
import getAllEvents from "../../services/api/get-data";
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';

export default function EventsPage(props) {
  const { featuredEvent } = props;
  const router = useRouter();

  function findSearchEvents(year, month) {
    const fullPath = `/events/${year}/${month}`;
    
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventSearch onSearch={findSearchEvents} />
      <EventList items={featuredEvent} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const featuredEvent = await getAllEvents();

  return {
    props: {
      featuredEvent
    },
    revalidate: 600
  };
}