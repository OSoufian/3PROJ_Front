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
    // const order = searchParams.get('orderBy');
    // , order  ? [order] : ["created_at"]
    useGetSearchVideos(query ?? "", (videoList: VideoType[]) => {
        setVideos(videoList);
      })
  }, [location.search]);

  return (
    <div>
      <div className="dark:bg-#121212 dark:text-#C2C2C2">
        <CategoryPanel />
      </div>
      <div>
        {video && video.length > 0 ? (
          <VideoList videos={video} />
        ) : (
          <div>
            <h2 className="no-video-title">No videos available</h2>
            <p>We're sorry, but there are no videos matching your search! Please try a different search term!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoListPage;