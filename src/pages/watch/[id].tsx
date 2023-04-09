// import React, { useState } from 'react';
// import '@/styles/VideoPage.css';

// function VideoPage(props: Props) {
//   const { videoSrc } = props;
//   const [comments, setComments] = useState<string[]>([]);

//   const handleAddComment = (comment: string) => {
//     setComments([...comments, comment]);
//   };

//   return (
//     <div className="video-page">
//       <div className="video-container">
//         <video src={videoSrc} controls crossOrigin='true' />
//       </div>
//       <div className="chat-container">
//         <div className="comment-list">
//           {comments.map((comment, index) => (
//             <div className="comment" key={index}>
//               {comment}
//             </div>
//           ))}
//         </div>
//         <div className="comment-input">
//           <input type="text" placeholder="Add a comment..." onChange={(event) => handleAddComment(event.target.value)} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default VideoPage;

import { useState } from 'react';
import { useDeleteVideo, useGetUser, useGetVideo, useGetVideos, useLogin, useRegister, useVideoUpload } from '@/apis';
import '@/styles/VideoPage.css';

interface Props {
  videoSrc: string;
}
interface Props {
  video: string;
}

function Video(props: Props) {
  const { video } = props;
  const { videoSrc } = props;
  // const [videoSrc, setVideoSrc] = useState<Blob | null>(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>([]);

  const handleAddComment = (comment: string) => {
    setComments([...comments, comment]);
  };


  // const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   if (event.target.files && event.target.files[0]) {
  //     setVideoSrc(event.target.files[0]);
  //   }
  // };
  

  // const handleRetrieve = () => {
  //   useGetVideo(video, (c: Blob) => setVideoSrc(c));
  // };

  // const handlePostComment = () => {
  //   usePostComment(video, comment, sessionStorage.token, () => setComment(''));
  // };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    handleAddComment(comment)

    // Clear the comment input field after submitting the comment
    setComment('');
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
        <div className="comment-form">
              <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onChange={handleCommentChange}
              />
              <button onClick={handleCommentSubmit}>Send</button>
            </div>
      </div>
    </div>
  );
}

export default Video;