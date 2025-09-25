import { Fragment, useEffect, useState } from 'react';
import Notification from '../ui/notification';

interface ContactFormData {
  email: string;
  name: string;
  message: string;
}

type NotificationData = {
  title: string;
  message: string;
  status: 'pending' | 'success' | 'error';
};

async function sendContactFormData(formData: ContactFormData): Promise<void> {
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to send message');
  }
}

export default function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState('');
  const [requestError, setRequestError] = useState('');

  useEffect(()=> {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus('');
        setRequestError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendMessageHandler(event: React.FormEvent) {
    event.preventDefault();

    const formData: ContactFormData = {
      email: enteredEmail,
      name: enteredName,
      message: enteredMessage,
    };

    setRequestStatus('pending');
    try {
      await sendContactFormData(formData);
      setRequestStatus('success');
      setEnteredEmail('');
      setEnteredName('');
      setEnteredMessage('');
      return;
    } catch (error) {
      setRequestError((error as Error).message);
      setRequestStatus('error');
      return;
    }
  }

  let notification: NotificationData | null = null;

  if (requestStatus === 'pending') {
    notification = {
      title: 'Sending message...',
      message: 'Your message is on its way!',
      status: 'pending',
    };
  }

  if (requestStatus === 'success') {
    notification = {
      title: 'Message sent!',
      message: 'Your message has been sent successfully.',
      status: 'success',
    };
  }

  if (requestStatus === 'error') {
    notification = {   
        title: 'Error!',    
        message: requestError || 'Something went wrong!',
        status: 'error',
    };
  }

  return (
    <Fragment>
      <div className="min-h-screen w-full">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-center mt-10">
            How can i help you!
          </h2>
        </div>
        <div className="h-auto" >
          <form
            className=" bg-white p-6 rounded-lg shadow-md w-[500px] mx-auto text-black"
            onSubmit={sendMessageHandler}
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={enteredName}
                onChange={(e) => setEnteredName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={enteredEmail}
                onChange={(e) => setEnteredEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={enteredMessage}
                onChange={(e) => setEnteredMessage(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
        {notification && (
          <Notification
            title={notification.title}
            message={notification.message}
            status={notification.status}
          />
        )}
      </div>
    </Fragment>
  );
}
