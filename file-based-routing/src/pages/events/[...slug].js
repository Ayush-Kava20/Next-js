import {useRouter} from 'next/router'
import { getFilteredEvents } from '../../../dummy-data';
import EventList from '../../components/events/event-list';
import { Fragment } from 'react';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';

export default function EventFilter() {
  const router = useRouter();
  const FilteredData = router.query.slug;

  if(!FilteredData){
    return <p className='center'>Loading...</p>
  }

  const year = FilteredData[0];
  const month = FilteredData[1];

  const numYear = +year;
  const numMonth = +month;

  if(isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12){
    return <Fragment>
      <div className='center'> 
      <p>Invalid Filter. Please adjust your values!</p>
        <Button link='/events'>
          Show All Events
        </Button>
      </div>
    </Fragment>
  }

  const filteredEvents = getFilteredEvents({year: numYear, month: numMonth});
  if(!filteredEvents || filteredEvents.length === 0){
    return <Fragment>
      <div className='center'> 
      <p>No events found for the chosen filter!</p>
        <Button link='/events'>
          Show All Events
        </Button>
      </div>
    </Fragment>
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
        <ResultsTitle date={date} />
        <EventList items={filteredEvents}/> 
    </Fragment>
  )
}
