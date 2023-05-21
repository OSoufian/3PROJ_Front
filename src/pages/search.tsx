import { CategoryPanel }  from '@/components/Categories';
import VideoList from '@/components/Videos/VideoList';
import { type VideoType } from '@/types';
import tempVideoList from '@/data/videoList';
import { useGetSearchVideos } from '@/apis/Video/uploadVideo';

function VideoListPage() {
  const [video, setVideos] = useState<VideoType[]>([]);
  const location = useLocation();

  useEffect(() => {
    const currentUrl = window.location.href;
    const parsedUrl = new URL(currentUrl);
    const searchParams = new URLSearchParams(parsedUrl.search);
    const query = searchParams.get('q');

    useGetSearchVideos(query ?? "", (videoList: VideoType[]) => {
        setVideos(videoList);
      })
  }, [location.search]);

  return (
    <div>
      <div className="dark:bg-#121212 dark:text-#C2C2C2">
        {/* <CategoryPanel video={filteredVideos} onFilterChange={handleFilterChange} /> */}
        <CategoryPanel />
      </div>
      <div>
        <VideoList videos={video?.length ? video : tempVideoList} />
      </div>
    </div>
  );
}

export default VideoListPage;