import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';

export default function FeedbackPage(props) {
  //   const [feedbackData, setFeedbackData] = useState([]);

  //   useEffect(() => {
  //     async function fetchFeedback() {
  //       const response = await axios.get('http://localhost:3000/api/feedback');
  //       setFeedbackData(response.data.feedback);
  //     }
  //     fetchFeedback();
  //   }, []);
  const { feedbackData } = props;

  return (
    <Fragment>
      <div className="w-full h-screen flex flex-col items-center justify-center text-2xl">
        <h1>Feedbacker email's</h1>
        <ul className="mt-2">
          {feedbackData &&
            feedbackData.map((e) => (
              <li key={e.id} className="mb-2">
                {e.email}
              </li>
            ))}
        </ul>
      </div>
    </Fragment>
  );
}

export async function getStaticProps() {
  const response = await axios.get('http://localhost:3000/api/feedback');

  return {
    props: {
      feedbackData: response.data.feedback,
    },
  };
}
