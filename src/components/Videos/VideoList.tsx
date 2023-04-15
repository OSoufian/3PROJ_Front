import { type VideoType } from '@/types';
import VideoCard from './VideoCard';

type VideoListProps = {
  video: VideoType[];
  filteredVideos: VideoType[];
  onFilterChange: (filteredVideos: VideoType[]) => void;
};

function VideoList({ video, filteredVideos, onFilterChange }: VideoListProps) {
  const displayVideos = filteredVideos && filteredVideos.length > 0 ? filteredVideos : video;

  return (
    <div className="bg-white dark:bg-#121212">
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
