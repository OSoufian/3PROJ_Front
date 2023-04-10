import { useParams } from 'react-router-dom';
import { type VideoType } from '@/types';
import { useGetVideoById, useGetVideo } from '@/apis';
import "@/styles/VideoPage.css";
import Chat from '@/components/Chat.tsx';
import Comments from '@/components/Comment';

function Video() {
  const [videoSrc, setVideoSrc] = useState<Blob>()
  const params = useParams();

  const [video, setVideo] = useState<VideoType|undefined>();

  useEffect(() => {
    if (!!video) {
      useGetVideo(video.VideoURL, setVideoSrc)
    }
  }, [video]);
  
  useEffect(() => {
    useGetVideoById(parseInt(params.id ?? ''), setVideo)
  }, [params.id]);

  return (
    <div>
      <div className="video-page">
        <div className="video-container">
          {!!videoSrc && (<video src={URL.createObjectURL(videoSrc as (Blob | MediaSource))} controls crossOrigin='true' />)}
        </div>
        <div className="chat-container">
          <Chat />
        </div>
      </div>
      <div>
        <Comments />
      </div>
    </div>
  );
}

export default Video;