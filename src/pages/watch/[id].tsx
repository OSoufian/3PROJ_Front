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
    useGetVideoById(parseInt(params.id ?? ''), setVideo)
    
  }, [params.id]);

  useEffect(() => {
    if (!!video) {
      useGetVideo(video.VideoURL, setVideoSrc)
    }
  }, [video]);
  

  return (
    <div>
      <div className="video-page">
        <div className="video-container">
          {!!videoSrc && (<video class="video-content" src={URL.createObjectURL(videoSrc as (Blob | MediaSource))} controls crossOrigin='true' />)}
        </div>
        <div className="chat-container">
          <Chat />
        </div>
      </div>
      <div>
        {!!video?.Id && 
          <Comments videoId={video?.Id}/>
        }
      </div>
    </div>
  );
}

export default Video;