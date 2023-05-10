import { useState } from 'react';
import '@/styles/Comment.css';
import { useGetUser } from '@/apis';
import { type User } from '@/types';

function Comments() {
  const [comment, setcomment] = useState('');
  const [comments, setcomments] = useState<string[]>([]);
  const [user, setUser] = useState<User | undefined>();

  const handleAddcomment = (comment: string) => {
    setcomments([...comments, comment]);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setcomment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment) { // check if comment is not empty
      handleAddcomment(comment);
      // Clear the comment input field after submitting the comment
      setcomment('');
    }
  };

  const handleCommentCancel = () => {
    if (comment) { // check if comment is not empty
      // Clear the comment input field after submitting the comment
      setcomment('');
    }
  };

  if (!!sessionStorage.token && !user) {
    useGetUser(sessionStorage.token, (c: any) => setUser(c))
  }

  return (
    <div>
      {!sessionStorage.token ? (
        <div>
          <h1>You don't have access to the comments, you have to be connected</h1>
          <Link to="/connect" className="connect-link">
            Connect
          </Link>
        </div>
      ) : (
        <div className='comment-container dark:bg-#212121'>
          <div className='comment-box'>
            <input
              className='comment-input dark:bg-#542367 dark:text-#C2C2C2'
              type='text'
              placeholder='Add a comment...'
              value={comment}
              onChange={handleCommentChange}
            />
            {comment ? (
              <div>
                <button
                  className='comment-submit-button'
                  onClick={handleCommentSubmit}
                >
                  Add Comment
                </button>

                <button
                  className='comment-cancel-button'
                  onClick={handleCommentCancel}
                >
                  Cancel
                </button>
              </div>
            ) : (<></>)}
          </div>
          <div className='comment-list dark:bg-#542367 dark:text-#C2C2C2'>
            {comments.map((comment, index) => (
              <div className='comment-item' key={index}>
                <div className='comment-author'>{user?.Username}</div>
                <div className='comment-content'>{comment}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Comments;