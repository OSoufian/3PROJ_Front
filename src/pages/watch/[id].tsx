import React, { useState } from 'react';
import '@/styles/VideoPage.css';

interface Props {
  videoSrc: string;
}

function VideoPage(props: Props) {
  const { videoSrc } = props;
  const [comments, setComments] = useState<string[]>([]);

  const handleAddComment = (comment: string) => {
    setComments([...comments, comment]);
  };

  return (
    <div className="video-page">
      <div className="video-container">
        <video src={videoSrc} controls crossOrigin='true' />
      </div>
      <div className="chat-container">
        <div className="comment-list">
          {comments.map((comment, index) => (
            <div className="comment" key={index}>
              {comment}
            </div>
          ))}
        </div>
        <div className="comment-input">
          <input type="text" placeholder="Add a comment..." onChange={(event) => handleAddComment(event.target.value)} />
        </div>
      </div>
    </div>
  );
}

export default VideoPage;