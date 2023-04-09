
// import '@/styles/VideoPage.css';
// import { type VideoType } from '@/types';
// import { useGetVideoById } from '@/apis';

// function Video() {
//   const [videoSrc, setVideoSrc] = useState<Blob>()
//   const [comment, setComment] = useState('');
//   const [comments, setComments] = useState<string[]>([]);
//   const params = useParams();

//   const handleAddComment = (comment: string) => {
//     setComments([...comments, comment]);
//   };

//   const [video, setVideo] = useState({})

//   useEffect(() => {
//     useGetVideoById(params.Id, setVideo)
//   }, [videoId])


//   // const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//   //   if (event.target.files && event.target.files[0]) {
//   //     setVideoSrc(event.target.files[0]);
//   //   }
//   // };
  

//   // const handleRetrieve = () => {
//   //   useGetVideo(video, (c: Blob) => setVideoSrc(c));
//   // };

//   // const handlePostComment = () => {
//   //   usePostComment(video, comment, sessionStorage.token, () => setComment(''));
//   // };

//   const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setComment(e.target.value);
//   };

//   const handleCommentSubmit = () => {
//     handleAddComment(comment)

//     // Clear the comment input field after submitting the comment
//     setComment('');
//   };

//   return (
//     <div className="video-page">
//       <div className="video-container">
//         {!!videoSrc && (<video src={URL.createObjectURL(videoSrc as (Blob | MediaSource))} controls crossOrigin='true' />)}
//       </div>
//       <div className="chat-container">
//         <div className="comment-list">
//           {comments.map((comment, index) => (
//             <div className="comment" key={index}>
//               {comment}
//             </div>
//           ))}
//         </div>
//         <div className="comment-form">
//               <input
//               type="text"
//               placeholder="Add a comment..."
//               value={comment}
//               onChange={handleCommentChange}
//               />
//               <button onClick={handleCommentSubmit}>Send</button>
//             </div>
//       </div>
//     </div>
//   );
// }

// export default Video;

import { useParams } from 'react-router-dom';
import { type VideoType } from '@/types';
import { useGetVideoById } from '@/apis';

function Video() {
  const [videoSrc, setVideoSrc] = useState<Blob>()
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>([]);
  const params = useParams();

  const handleAddComment = (comment: string) => {
    setComments([...comments, comment]);
  };

  const [video, setVideo] = useState<VideoType>({});

  useEffect(() => {
    useGetVideoById(parseInt(params.id ?? ''), setVideo)
  }, [params.id]);

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
        {!!videoSrc && (<video src={URL.createObjectURL(videoSrc as (Blob | MediaSource))} controls crossOrigin='true' />)}
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