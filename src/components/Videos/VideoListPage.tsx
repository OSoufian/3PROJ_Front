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

  const defaultVideo = {
    Id: 5,
    Name: "Oui",
    Description: "C'est sympa de fou",
    Icon: "",
    VideoURL: "1681064019680-bandicam_2023-02-12_21-35-53-792.mp4",
    ChannelId: 2,
    Channel: {
      Id: 0,
      OwnerId: 0,
      Owner: {
        Id: 0,
        Icon: "",
        Username: "",
        Email: "",
        Password: "",
        Permission: 0,
        Increndentials: "",
        ValideAccount: false,
        Disable: false,
        Subscribtion: null,
        Role: null
      },
      Description: "",
      SocialLink: "",
      Banner: "",
      Icon: "",
      Subscribers: null
    },
    Views: 0,
    CreationDate: "2023-04-09T00:00:00Z"
  };

  return (
    <div className="container">
      <div>
        <CategoryPanel />
      </div>
      <div>
        <VideoList videos={videos?? [defaultVideo]} />
      </div>
    </div>
  );
}

export default VideoListPage;