import { CategoryPanel }  from '@/components/Categories';
import VideoList from './VideoList';
import "@/styles/VideoListPage.css"
import { useGetVideos } from '@/apis';
import { type VideoType } from '@/types';
import SearchBar from "../NavBar/SearchBar";
import tempVideoList from '@/data/videoList';

function VideoListPage() {
  const [video, setVideos] = useState<VideoType[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideoType[]>([]);

  useEffect(() => {
    useGetVideos((videoList: VideoType[]) => {
      setVideos(videoList);
      setFilteredVideos(videoList);
    });
  }, []);

  const handleFilterChange = (filteredVideos: VideoType[]) => {
    setFilteredVideos(filteredVideos);
  };

  const handleSearch = (searchText: string) => {
    const filteredVideos = video.filter(video => video.Name.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredVideos(filteredVideos);
  };

  return (
    <div className="container">
      <div>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div>
        <CategoryPanel video={filteredVideos} onFilterChange={handleFilterChange} />
      </div>
      <div>
        <VideoList video={video?.length ? video : tempVideoList} filteredVideos={filteredVideos} onFilterChange={handleFilterChange} />
      </div>
    </div>
  );
}

export default VideoListPage;