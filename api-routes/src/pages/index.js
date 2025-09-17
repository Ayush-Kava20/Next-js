import { useRef } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Home() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  async function handleSubmit(event) {
    event.preventDefault();
    // console.log(response.data);
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;

    const reqBody = {
      email: enteredEmail,
      feedback: enteredFeedback,
    };

    const response = await axios.post(
      'http://localhost:3000/api/feedback',
      reqBody,
    );
    // console.log(response.data);
    
    emailInputRef.current.value = '';
    feedbackInputRef.current.value = '';
  }

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center ">
      <h1>Welcome to Next.js! - API Routes Example</h1>
      <div className="w-[25rem] h-[18rem] border p-4 rounded-md shadow-md mt-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col gap-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              ref={emailInputRef}
              className="ring ring-amber-50 h-10"
            />
          </div>
          <div className="mb-4 flex flex-col gap-3 ">
            <label htmlFor="feedback">Feedback</label>
            <textarea
              id="feedback"
              name="feedback"
              ref={feedbackInputRef}
              className="ring ring-amber-50"
            />
          </div>
          <div className="text-center flex gap-4 justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md cursor-pointer"
            >
              Submit
            </button>
            <Link href="/feedback">
              <button className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md cursor-pointer">
                All Feedback
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
