import React from 'react';
import VideoCard from './VideoCard';

type Video = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
};

type VideoListProps = {
  videos: Video[];
};

function VideoList({ videos }: VideoListProps) {
  return (
    <div>
      {videos.map((video) => (
        <Link to={`/video/${video.id}`} key={video.id}>
            <VideoCard
            title={video.title}
            description={video.description}
            thumbnail={video.thumbnail}
            />
        </Link>
      ))}
    </div>
  );
}

export default VideoList;