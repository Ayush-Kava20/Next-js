import { useState } from 'react';
import axios from 'axios';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);

    if (!showComments) {  
      axios.get(`/api/comments/${eventId}`)
        .then((response) => {
          setComments(response.data.comments);
        })
        .catch((error) => {
          console.error('There was an error!', error);
        }); 
    }
  }

  function addCommentHandler(commentData) {
    const reqBody = {
      ...commentData,
    };

    axios.post(`/api/comments/${eventId}`, reqBody)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      }); 
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
