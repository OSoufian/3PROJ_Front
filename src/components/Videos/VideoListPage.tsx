import { CategoryPanel }  from '@/components/Categories';
import VideoList from './VideoList';
import "@/styles/VideoListPage.css"
import { useGetVideos } from '@/apis';
import { type VideoType } from '@/types';

function VideoListPage() {
  const [videos, setVideos] = useState<VideoType[]>([]);

  useEffect(() => {
    useGetVideos((videoList: VideoType[]) => {
      setVideos(videoList);
    });
  }, []);

  return (
    <div className="container">
      <div>
        <CategoryPanel />
      </div>
      <div>
        <VideoList videos={videos}/>
      </div>
    </div>
  );
}

export default VideoListPage;