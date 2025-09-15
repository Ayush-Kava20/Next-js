import { useRouter } from "next/router";
import { Fragment } from 'react';
import { getAllEvents } from '../../../dummy-data';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';

export default function EventsPage() {
  const router = useRouter();
  const feturedEvent = getAllEvents();

  function findSearchEvents(year, month){
    const fullPath = `/events/${year}/${month}`;
    
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventSearch  onSearch={findSearchEvents}/>
      <EventList items={feturedEvent} />
    </Fragment>
  );
}
