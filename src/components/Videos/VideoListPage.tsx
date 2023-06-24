import { CategoryPanel }  from '@/components/Categories';
import VideoList from './VideoList';
import { useGetVideos } from '@/apis';
import { type VideoType } from '@/types';
import tempVideoList from '@/data/videoList';
import "@/styles/VideoListPage.css"; 

function VideoListPage() {
  const [video, setVideos] = useState<VideoType[]>([]);

  useEffect(() => {
    useGetVideos((videoList: VideoType[]) => {
      setVideos(videoList);
    });
  }, []);

  return (
    <div>
      <div className="dark:bg-#121212 dark:text-#C2C2C2">
        <CategoryPanel />
      </div>
      <div>
        {video && video.length > 0 ? (
          <VideoList videos={video} />
        ) : (
          <div className="no-video-title"><h2>No videos available</h2></div>
        )}
      </div>
    </div>
  );
}

export default VideoListPage;