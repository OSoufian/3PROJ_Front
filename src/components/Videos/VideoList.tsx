import { type VideoType } from '@/types';
import VideoCard from './VideoCard';

type VideoListProps = {
  videos: VideoType[];
  filteredVideos: VideoType[];
  onFilterChange: (filteredVideos: VideoType[]) => void;
};

function VideoList({ videos, filteredVideos, onFilterChange }: VideoListProps) {
  const displayVideos = filteredVideos && filteredVideos.length > 0 ? filteredVideos : videos;
  console.log(displayVideos);

  return (
    <div>
      {displayVideos.map((video) => (
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