import { type VideoType, type ChannelType } from "@/types";
import { useGetChannelById, useGetVideosByChannel } from '@/apis';
import "@/styles/ChannelVideosStyle.css"
import { useParams } from 'react-router-dom';
import envVars from "../../../public/env-vars.json"
const baseURL = envVars["user-url"]

interface Category {
  id: number;
  name: string;
}

const categories = [
  {id: 1, name: "Videos"},
  {id: 2, name: "Infos"}
]


function ChannelVideos() {
    const [videoList, setVideoList] = useState<VideoType[] | null>()
    const [channel, setChannel] = useState<ChannelType | undefined>();
    const [activeCategory, setActiveCategory] = useState(1);
    const param = useParams();

    const handleCategoryClick = (category: Category) => {
      setActiveCategory(category.id);
    };

    useEffect(() => {
      useGetVideosByChannel(parseInt(param.id ?? ""),["created_at DESC"],(c: VideoType[]) => {
        const updatedVideoList = c
          .filter((v: VideoType) => v.ChannelId == parseInt(param.id ?? "") )
          .map((v: VideoType) => {
            let channel: ChannelType | undefined;
  
            handleRetreiveChannel(v, (c: ChannelType) => {
              channel = c
              setChannel(c)
            })
  
            return {
              ...v,
              channelIcon: channel?.Icon
            }
  
          })
        setVideoList(updatedVideoList);
      });
    }, [parseInt(param.id ?? "")])

    const handleRetreiveChannel = (video: VideoType, c: Function) => {
        return useGetChannelById(video.ChannelId, c)
    }
    
    return (
      <div>
        <div className="banner-section">
          <img className="banner-image" src={`${baseURL}/image?imagename=${channel?.Banner}`} alt="Banner" />
        </div>
        <div className="profile-picture-section">
          <img className="profile-picture" src={`${baseURL}/image?imagename=${channel?.Icon}`} alt="Profile Picture" />
          <h2 className="channel-name">{channel?.Name}</h2>
        </div>

        <div className='panel'>
      <div className='container'>
      <ul>
        {categories.map((category) => (
          <Link key={category.id} to={``} className={`item${activeCategory === category.id ? ' active' : ''} dark:text-#C2C2C2`} onClick={() => handleCategoryClick(category)}>
            {category.name}
          </Link>
        ))}
        </ul>
      </div>
    </div>



        <div className="video-list">
          {activeCategory === 1 && !!videoList &&
            videoList.map((v: VideoType) => (
              <div key={v.Id} className="video-card">
                <img
                  className="w-full h-40 sm:h-52 object-cover"
                  src={v.Icon ? `${baseURL}/image?imagename=${v.Icon}` : `${baseURL}/image?imagename=default.png`}
                  alt={v.Name}
                />
                <div className="video-title">
                  <h3>{v.Name}</h3>
                </div>  
                <div className="video-hidden"> <p>{v.IsHide ? "[Hidden]" : ""}</p></div>
                <div className="video-hidden"> <p>{v.IsBlock ? "[Blocked]" : ""}</p></div>
                <div className="video-description">
                  <p>{v.Description}</p>
                </div>                
                <p>{`${v.Views} ${v.Views > 1 ? 'views' : 'view'}`}</p>
                <p>{v.CreationDate}</p>
                <Link to={`/watch/${v.Id}`} key={v.Id}>
                  <button className="watch-btn">Watch Now</button>
                </Link>
              </div>
            ))}
        </div>
      </div>
    );
  }
  
  export default ChannelVideos;