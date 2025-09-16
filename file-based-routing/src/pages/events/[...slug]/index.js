import { getFilteredEvents } from 'services/api/get-data';
// import EventList from '../../../components/events/event-list';
import EventList from '@/components/events/event-list';
import { Fragment } from 'react';
import ResultsTitle from 'components/events/results-title';

export default function EventFilter(props) {
  const filteredEvents = props.filteredEvents;

  // if(!FilteredData){
  //   return <p className='center'>Loading...</p>
  // }

  // const year = FilteredData[0];
  // const month = FilteredData[1];

  // const numYear = +year;
  // const numMonth = +month;

  // if(isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12){
  //   return <Fragment>
  //     <div className='center'>
  //     <p>Invalid Filter. Please adjust your values!</p>
  //       <Button link='/events'>
  //         Show All Events
  //       </Button>
  //     </div>
  //   </Fragment>
  // }

  // const filteredEvents = getFilteredEvents({year: numYear, month: numMonth});
  // if(!filteredEvents || filteredEvents.length === 0){
  //   return <Fragment>
  //     <div className='center'>
  //     <p>No events found for the chosen filter!</p>
  //       <Button link='/events'>
  //         Show All Events
  //       </Button>
  //     </div>
  //   </Fragment>
  // }

  const date = new Date(props.numYear, props.numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const FilteredData = params.slug;

  if (!FilteredData) {
    return <p className="center">Loading...</p>;
  }

  const year = FilteredData[0];
  const month = FilteredData[1];

  const numYear = +year;
  const numMonth = +month;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      notFound: true,
    };
  }

  const filteredEvents = await getFilteredEvents({ year: numYear, month: numMonth });
  if (!filteredEvents || filteredEvents.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      filteredEvents,
      numMonth,
      numYear
    },
  };
}
