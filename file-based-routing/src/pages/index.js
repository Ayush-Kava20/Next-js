import { getFeaturedEvents } from '../../dummy-data';
import EventList from '../components/events/event-list';

export default function HomePage() {
  const feturedEvent = getFeaturedEvents();

  return (
    <div className="bg-amber-200">
      <EventList items={feturedEvent} />
    </div>
  );
}
