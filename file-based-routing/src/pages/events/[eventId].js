import {useRouter } from 'next/router';
import { getEventById } from '../../../dummy-data'
import { Fragment } from 'react/jsx-runtime';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';

export default function EventDetailPage() {
 const router = useRouter();
 const eventID = router.query.eventId;

 const event = getEventById(eventID);

 if(!event){
  return <p>No event found!</p>
 }
 return (
  <Fragment>
    <EventSummary title={event.title} />
    <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
    <EventContent>
      <p>{event.description}</p>
    </EventContent>
  </Fragment>
 )

}
