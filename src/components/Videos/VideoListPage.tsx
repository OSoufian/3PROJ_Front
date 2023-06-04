import { CategoryPanel }  from '@/components/Categories';
import VideoList from './VideoList';
import { useGetVideos } from '@/apis';
import { type VideoType } from '@/types';
import tempVideoList from '@/data/videoList';

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
        <VideoList videos={video?.length ? video : tempVideoList} />
      </div>
    </div>
  );
}

export default VideoListPage;