import { type VideoType } from '@/types';
import VideoCard from './VideoCard';

type VideoListProps = {
  videos: VideoType[];
};

function VideoList({ videos }: VideoListProps) {
  return (
    <div>
      {videos.map((video) => (
        <Link to={`/watch/${video.Id}`} key={video.Id}>
            <VideoCard
            title={video.Name}
            description={video.Description}
            thumbnail={video.Icon}
            />
        </Link>
      ))}
    </div>
  );
}

export default VideoList;
