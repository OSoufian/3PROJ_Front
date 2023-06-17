import { type VideoType, type ChannelType } from "@/types";
import { useGetChannelById, useGetVideosByChannel } from '@/apis';
import "@/styles/ChannelVideosStyle.css"
import { useParams } from 'react-router-dom';
import envVars from "../../../public/env-vars.json"
const baseURL = envVars["user-url"]


function ChannelVideos() {
    const [videoList, setVideoList] = useState<VideoType[] | null>()
    const [channel, setChannel] = useState<ChannelType | undefined>();
    const param = useParams();

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
        <h2 className="your-videos-title">{channel?.Name}</h2>
        <div className="video-list">
          {!!videoList &&
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