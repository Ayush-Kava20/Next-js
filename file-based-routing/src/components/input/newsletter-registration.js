import { useRef } from 'react';
import axios from 'axios';
import classes from './newsletter-registration.module.css';

function NewsletterRegistration() {
  const userEmailInputRef = useRef();
  
  async function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = userEmailInputRef.current.value;
    const response = await axios.post('/api/user', { email: enteredEmail });
    console.log(response.data);
    userEmailInputRef.current.value = '';
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={userEmailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
