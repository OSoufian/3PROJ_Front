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
    console.log("getting video")
    useGetVideoById(parseInt(params.id ?? ''), (video: VideoType) => {
      if (!video.IsBlock) {
        setVideo(video);
        useGetChannelById(video.ChannelId, (channel: ChannelType) => {
          const updatedVideo = { ...video, Channel: channel };
          setVideo(updatedVideo);
          useGetVideo(video.VideoURL, setVideoSrc);
        });
      }
    });
  }, [params.id]);

  const handleAddViews = () => {
    useGetVideoById(parseInt(params.id ?? ''), (video: VideoType) => {
      const views = video.Views + 1;
      const updatedVideo = { ...video, Views: views };
      useEditVideo(updatedVideo, video.ChannelId, () => {});
    });
  };

  return (
    <div>
      {video ? (
        <div>
          <div className="video-page">
            <div className="video-container">
              {!!videoSrc && (
                <video
                  className="video-content"
                  src={URL.createObjectURL(videoSrc as (Blob | MediaSource))}
                  controls
                  crossOrigin="true"
                  onTimeUpdate={() => {
                    const videoElement = document.querySelector('.video-content') as HTMLVideoElement;
                    if (videoElement && videoElement.currentTime >= 20 && videoElement.currentTime < 20.2) {
                      handleAddViews();
                    }
                  }}
                />
              )}
              {!!video && (
                <div className="video-details">
                  <h2 className="new-video-title">{video.Name}</h2>
                  <div className="channel-components">
                    <button className="channel-icon-button">
                      <Link to={`/channel/${video.ChannelId}`}>
                        <img
                          className="channel-icon"
                          src={
                            video.Channel.Icon
                              ? `${baseURL}/image?imagename=${video.Channel.Icon}`
                              : `${baseURL}/image?imagename=default.png`
                          }
                          alt="Channel Icon"
                        />
                      </Link>
                    </button>
                    <button className="channel-name-button">
                      <Link to={`/channel/${video.ChannelId}`}>
                        {video.Channel.Name}
                      </Link>
                    </button>
                  </div>
                  <div className="video-details-box">
                    <div>
                      <p className="video-views">{video.Views} Views</p>
                      <p className="video-description">Description: {video.Description}</p>
                    </div>
                  </div>
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
      ) : (
        <div>The video you're searching for is currently blocked or does not exist on the platform.</div>
      )}
    </div>
  );
}

export default Video;