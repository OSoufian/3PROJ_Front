import { type VideoType, type ChannelType } from "@/types";
import { useDeleteVideo, useGetChannelById, useGetVideosByChannel, useGetMeChannel, useEditVideo } from '@/apis';
import "@/styles/ChannelVideosStyle.css"


function ChannelVideos() {
    const [videoList, setVideoList] = useState<VideoType[] | null>()
    const [channel, setChannel] = useState<ChannelType | undefined>();

    useEffect(() => {
      useGetMeChannel(sessionStorage.token ?? '', (c: ChannelType) => setChannel(c));
    }, [channel?.Id]);

    useEffect(() => {
      useGetVideosByChannel(channel?.Id,["created_at DESC"],(c: VideoType[]) => {
        const updatedVideoList = c
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
    }, [channel?.Id])

    const handleRetreiveChannel = (video: VideoType, c: Function) => {
        return useGetChannelById(video.ChannelId, c)
    }
    
    const handleRetrieve = () => {
        useGetVideosByChannel(channel?.Id,["created_at DESC"],(c: VideoType[]) => {
            const updatedVideoList = c
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

    return (
      <div>

        <h2 className="your-videos-title">Your Videos</h2>
        <div className="video-list">
          {!!videoList &&
            videoList.map((v: VideoType) => (
              <div key={v.Id} className="video-card">
                <img
                  className="w-full h-40 sm:h-52 object-cover"
                  src={v.Icon ? `http://127.0.0.1:3000/image?imagename=${v.Icon}` : 'http://127.0.0.1:3000/image?imagename=default.png'}
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
                <p>{v.CreationDate.split('T')[0]}</p>
                <Link to={`/watch/${v.Id}`} key={v.Id}>
                  <button className="watch-btn">Watch Now</button>
                </Link>
                {!!channel && (
                  <button onClick={() => useDeleteVideo(v.VideoURL, channel.Id, () => handleRetrieve())} className="delete-btn">
                    Delete
                  </button>
                )}
                <div className="dropdown">
                  <button className="dropdown-btn" />
                  <div className="dropdown-content">
                    <Link to={`/channel/edit/${v.Id}&channId=${channel?.Id}`} key={v.Id} className="watch-btn">
                      Edit
                    </Link>
                    {!!channel && (
                      <div>
                        {!!v.IsHide ? (
                          <button
                            onClick={() => {
                              v.IsHide = false;
                              useEditVideo(v, channel.Id, () => handleRetrieve()); 
                            }}
                          >
                            Unhide
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              v.IsHide = true;
                              useEditVideo(v, channel.Id, () => handleRetrieve());
                            }}
                          >
                            Hide
                          </button>
                        )}
                      </div>
                      
                    )}
                    <br />
                    {!!channel && (
                      <div>
                        {!!v.IsBlock ? (
                          <button
                            onClick={() => {
                              v.IsBlock = false;
                              useEditVideo(v, channel.Id, () => handleRetrieve()); 
                            }}
                          >
                            Unblock
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              v.IsBlock = true;
                              useEditVideo(v, channel.Id, () => handleRetrieve());
                            }}
                          >
                            Block
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
  
  export default ChannelVideos;