import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ChannelType, type VideoType } from '@/types';
import { Link } from 'react-router-dom';
import { useGetVideoById, useGetVideo, useEditVideo, useGetChannelById } from '@/apis';
import "@/styles/VideoPage.css";
import Chat from '@/components/Chat.tsx';
import Comments from '@/components/Comment';
import envVars from "../../../public/env-vars.json"
const baseURL = envVars["user-url"]
const chatUrl = envVars["chat-url"]

function Video() {
  const [videoSrc, setVideoSrc] = useState<Blob>();
  const params = useParams();
  
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [video, setVideo] = useState<VideoType | undefined>();

  useEffect(() => {
    if (video?.Id) {
      const newSocket = new WebSocket(`${chatUrl}`);
      // Set the socket object
      setSocket(newSocket);
    }
  }, [video?.Id]);

  useEffect(() => {
    useGetVideoById(parseInt(params.id ?? ''), (video: VideoType) => {
      setVideo(video);
      useGetChannelById(video.ChannelId, (channel: ChannelType) => {
      const updatedVideo = {...video, Channel: channel}
      // Get the channel information for the video
        setVideo(updatedVideo);
      });
    });
  }, [params.id]);

  useEffect(() => {
    if (!!video) {
      useGetVideo(video.VideoURL, setVideoSrc);
    }
  }, [video]);

  const handleAddViews = () => {
    if (video) {
      const views = video.Views + 1;
      const updatedVideo = { ...video, Views: views };
      useEditVideo(updatedVideo, video.ChannelId, () => {});
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
          {!!video && (
            <div className="video-details">
              <h2 className="video-title">{video.Name}</h2>
              <p className="video-views">Views: {video.Views}</p>
              <button className="channel-icon-button">
                <Link to={`/channel/${video.ChannelId}`}>
                  <img className="channel-icon" 
                  src={video.Channel.Icon ? `${baseURL}/image?imagename=${video.Channel.Icon}` : `${baseURL}/image?imagename=default.png`}
                  alt="Channel Icon" />
                </Link>
              </button>
              <br/>
              <button className="channel-name-button" onClick={() => console.log(video.Channel)}>
                <Link to={`/channel/${video.ChannelId}`}>
                  {video.Channel.Name}
                </Link>
              </button>
              <p className="video-description">Description: {video.Description}</p>
            </div>
          )}
        </div>
        <div className="chat-container">
          {!!video?.Id && <Chat socket={socket} videoId={video?.Id} />}
        </div>
      </div>
      <div>
        {!!video?.Id && <Comments videoId={video?.Id} />}
      </div>
    </div>
  );
}

export default Video;
