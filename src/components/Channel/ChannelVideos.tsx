import { type VideoType, type ChannelType, type User } from "@/types";
import { useDeleteVideo, useGetChannelById, useGetVideosByChannel, useGetUser } from '@/apis';


function ChannelVideos(channel: ChannelType | undefined) {
    const [hiddenVideos, setHiddenVideos] = useState<string[]>([]);
    const [blockedVideos, setBlockedVideos] = useState<string[]>([]);
    const [videoList, setVideoList] = useState<VideoType[] | null>()
    const [user, setUser] = useState<User | undefined>()

    useEffect(() => {
        useGetVideosByChannel(channel?.Id,(c: VideoType[]) => {
          const updatedVideoList = c
            .filter((v: VideoType) => !hiddenVideos.includes(`${v.Id}`))
            .filter((v: VideoType) => !blockedVideos.includes(`${v.Id}`))
            .filter((v: VideoType) => v.ChannelId == channel?.Id )
            .map((v: VideoType) => {
              let channel: ChannelType | undefined;
    
              handleRetreiveChannel(v, (c: ChannelType) => {
                channel = c
              })
    
              return {
                ...v,
                channelIcon: channel?.Icon
              }
    
            })
          setVideoList(updatedVideoList);
        });
      })

    const handleRetreiveChannel = (video: VideoType, c: Function) => {
        return useGetChannelById(video.ChannelId, c)
    }
    
    const handleRetrieve = () => {
        if(!!channel) useGetVideosByChannel(channel.Id,(c: VideoType[]) => {
            const updatedVideoList = c
            .filter((v: VideoType) => !hiddenVideos.includes(`${v.Id}`))
            .filter((v: VideoType) => !blockedVideos.includes(`${v.Id}`))
            .filter((v: VideoType) => v.ChannelId == channel?.Id )
            .map((v: VideoType) => {
                let channel: ChannelType | undefined;
        
                handleRetreiveChannel(v, (c: ChannelType) => {
                channel = c
                })
        
                return {
                ...v,
                channelIcon: channel?.Icon
                }
        
            })
            setVideoList(updatedVideoList);
        });
        };

        if (!!sessionStorage.token && !user) {
            useGetUser(sessionStorage.token, (c: any) => setUser(c))
            handleRetrieve()
          }

    return (
      <div className="videos-section">
        <h2 className="your-videos-title">Your Videos</h2>
        <div className="video-list">
          {videoList &&
            videoList.map((v) => (
              <div key={v.Id} className="video-card">
                <img
                  src={`http://127.0.0.1:3000/files?filename=${v.Icon}`}
                  alt={v.Name}
                />
                <div className="video-title">
                  <h3>{v.Name}</h3>
                </div>
                <div className="video-description">
                  <p>{v.Description}</p>
                </div>
                <p>{`${v.Views} ${v.Views > 1 ? 'views' : 'view'}`}</p>
                <Link to={`/watch/${v.Id}`} key={v.Id}>
                  <button className="watch-btn">Watch Now</button>
                </Link>
                {!!channel && (
                  <button
                    onClick={() =>
                      useDeleteVideo(v.VideoURL, channel.Id, () => handleRetrieve())
                    }
                    className="delete-btn"
                  >
                    Delete
                  </button>
                )}
                <div className="dropdown">
                  <button className="dropdown-btn" />
                  <div className="dropdown-content">
                    <Link
                      to={`/channel/${v.Id}&channId=${channel?.Id}`}
                      key={v.Id}
                      className="watch-btn"
                    >
                      Edit
                    </Link>
                    <a href="#" onClick={() => setHiddenVideos([...hiddenVideos, `${v.Id}`])}>
                      Hide
                    </a>
                    <a href="#" onClick={() => setBlockedVideos([...blockedVideos, `${v.Id}`])}>
                      Block
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
  
  export default ChannelVideos;