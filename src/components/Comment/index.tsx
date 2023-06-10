import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useCreateChat, useDeleteChat, useGetChats, useGetUser, useGetUserById } from '@/apis';
import { type Message, type User } from '@/types';
import '@/styles/Comment.css';

function Comments({ videoId }: { videoId: number }) {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Message[]>([]);
  const [user, setUser] = useState<User | undefined>();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    useGetChats(videoId, (c: Message[]) => {
      const updatedComments = c.map((message: Message) => {
        const updatedMessage = { ...message };
        useGetUserById(message.UserId, (user: User) => {
          updatedMessage.User = user;
          setComments(updatedComments.filter((v: Message) => v.VideoId === videoId));
        });
        return updatedMessage;
      });
    });
  }, [videoId]);

  const handleRetrieveChats = () => {
    useGetChats(videoId, (c: Message[]) => {
      const updatedComments = c.map((message: Message) => {
        const updatedMessage = { ...message };
        useGetUserById(message.UserId, (user: User) => {
          updatedMessage.User = user;
          setComments(updatedComments.filter((v: Message) => v.VideoId === videoId));
        });
        return updatedMessage;
      });
    });
  };

  const handleAddComment = (comment: string) => {
    if (user) {
      useCreateChat(videoId, user.Id, comment, new Date(), () => { handleRetrieveChats() });
    } else {
      console.log('Not connected');
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment) {
      handleAddComment(comment);
      setComment('');
    }
  };

  const handleCommentCancel = () => {
    setComment('');
  };

  useEffect(() => {
    if (sessionStorage.token && !user) {
      useGetUser(sessionStorage.token, (c: any) => {
        setUser(c);
      });
    }
  }, [user]);

  const handleDeleteComment = (commentId: number) => {
    useDeleteChat(commentId, () => {handleRetrieveChats()})
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      <div>
        <div className="comment-container dark:bg-#212121">
            <div className="comment-box">
              <input
                className="comment-input dark:bg-#212121 dark:text-#C2C2C2"
                type="text"
                placeholder="Add a comment..."
                value={comment}
                onChange={handleCommentChange}
              />
              {comment ? (
                !sessionStorage.token ? (
                  <div>
                    <h1>You Have to be connected</h1>
                    <Link to="/connect" className="connect-link">
                      Connect
                    </Link>
                  </div>
                ) : (
                  <div>
                    <button className="comment-submit-button" onClick={handleCommentSubmit}>
                      Add Comment
                    </button>
                    <button className="comment-cancel-button" onClick={handleCommentCancel}>
                      Cancel
                    </button>
                  </div>
                )
              ) : (
                <></>
              )}
            </div>
          </div>
        <div className="comment-list dark:text-#C2C2C2">
          {comments.map((comment, index) => (
            <div className="comment-item" key={index}>
              <div className="comment-info-container">
                <div className="profile-icon-wrapper">
                  <img
                    className="profile-icon"
                    src={
                      comment.User.Icon
                        ? `http://127.0.0.1:3000/image?imagename=${comment.User.Icon}`
                        : 'http://127.0.0.1:3000/image?imagename=default.png'
                    }
                    alt="User icon"
                  />
                </div>
                <div className="comment-info-wrapper">
                  <div className="comment-author">{comment.User.Username}</div>
                  <div className="comment-content">{comment.Content}</div>
                  <div className="comment-date">{comment.Created.split('T')[0]}</div>
                  {comment.User.Username === user?.Username && (
                    <div className="comment-dropdown">
                      <button className="comment-dropdown-button" onClick={toggleDropdown}>
                        <FontAwesomeIcon icon={faEllipsisV} />
                      </button>
                      {showDropdown && (
                        <div className="comment-dropdown-menu">
                          <button className="comment-dropdown-item" onClick={() => handleDeleteComment(comment.Id)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Comments;