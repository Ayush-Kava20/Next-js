import { useRef } from 'react';
import axios from 'axios';
import classes from './newsletter-registration.module.css';
import { useContext } from 'react';
import notificationContext from '@/store/notification-context';

function NewsletterRegistration() {
  const userEmailInputRef = useRef();
  const notificationCtx = useContext(notificationContext);

  async function registrationHandler(event) {
    event.preventDefault();
    try {
      notificationCtx.showNotification({
        title: 'Signing up...',
        message: 'Registering for newsletter.',
        status: 'pending',
      });
      
      const enteredEmail = userEmailInputRef.current.value;
      const response = await axios.post('/api/user', { email: enteredEmail });

      notificationCtx.showNotification({
        title: 'Success!',
        message: 'Successfully registered for newsletter!',
        status: 'success',
      });
      console.log(response.data);
      userEmailInputRef.current.value = '';
    } catch (error) {
      notificationCtx.showNotification({
        title: 'Error!',
        message: 'Registration failed.',
        status: 'error',
      });
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={userEmailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
