import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { type VideoType } from '@/types';
import { useGetVideoById, useGetVideo, useEditVideo } from '@/apis';
import "@/styles/VideoPage.css";
import Chat from '@/components/Chat.tsx';
import Comments from '@/components/Comment';

function Video() {
  const [videoSrc, setVideoSrc] = useState<Blob>()
  const params = useParams();

  const [video, setVideo] = useState<VideoType|undefined>();

  useEffect(() => {
    useGetVideoById(parseInt(params.id ?? ''), setVideo);
  }, [params.id]);

  useEffect(() => {
    if (!!video) {
      useGetVideo(video.VideoURL, setVideoSrc);
    }
  }, [video]);

  const handleAddViews = () => {
    if (video) {
      const views = video.Views + 1
      const updatedVideo = { ...video, Views: views };
      useEditVideo(updatedVideo, video.ChannelId, () => {})
    }
  };

  return (
    <div>
      <div className="video-page">
        <div className="video-container">
          {!!videoSrc && (
            <video
              className="video-content"
              src={URL.createObjectURL(videoSrc as (Blob | MediaSource))}
              controls
              crossOrigin="true"
              onTimeUpdate={(e) => {
                const currentTime = e.currentTarget.currentTime;
                if (currentTime >= 20) {
                  handleAddViews();
                  e.currentTarget.removeEventListener('timeupdate', handleAddViews);
                }
              }}
            />
          )}
        </div>
        <div className="chat-container">
          <Chat />
        </div>
      </div>
      <div>
        {!!video?.Id && <Comments videoId={video?.Id} />}
      </div>
    </div>
  );
}

export default Video;