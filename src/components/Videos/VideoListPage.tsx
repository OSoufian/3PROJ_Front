import { CategoryPanel }  from '@/components/Categories';
import VideoList from './VideoList';
import { useGetVideos } from '@/apis';
import { type VideoType } from '@/types';
import tempVideoList from '@/data/videoList';

function VideoListPage() {
  const [video, setVideos] = useState<VideoType[]>([]);
  // const [filteredVideos, setFilteredVideos] = useState<VideoType[]>([]);

  useEffect(() => {
    useGetVideos((videoList: VideoType[]) => {
      setVideos(videoList);
      // setFilteredVideos(videoList);
    });
  }, []);

  // console.log(video)

  // const handleFilterChange = (filteredVideos: VideoType[]) => {
  //   setFilteredVideos(filteredVideos);
  // };

  // const handleSearch = (searchText: string) => {
  //   const filteredVideos = video.filter(video => video.Name.toLowerCase().includes(searchText.toLowerCase()));
  //   setFilteredVideos(filteredVideos);
  // };

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