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
      useGetVideosByChannel(18,(c: VideoType[]) => {
        const updatedVideoList = c
          .filter((v: VideoType) => v.ChannelId == 18 )
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
        useGetVideosByChannel(18,(c: VideoType[]) => {
            const updatedVideoList = c
            .filter((v: VideoType) => v.ChannelId == 18 )
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
                  src={v.Icon ? `http://127.0.0.1:3000/image?imagename=${v.Icon}` : 'https://www.feteduviolon.com/wp-content/uploads/2023/02/placeholder-1.png'}
                  alt={v.Name}
                />
                <div className="video-title">
                  <h3>{v.Name}</h3>
                </div>
                <div className="video-description">
                  <p>{v.Description}</p>
                </div>
                <p>{`${v.Views} ${v.Views > 1 ? 'views' : 'view'}`}</p>
                {/* remplacer <p>{v.CreatedAt}</p> par <p>{v.CreationDate}</p> */}
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
                    <Link to={`/channel/${v.Id}&channId=${channel?.Id}`} key={v.Id} className="watch-btn">
                      Edit
                    </Link>
                    {!!channel && (
                      <button
                        onClick={() => {
                          v.IsHide = true;
                          useEditVideo(v, channel.Id, () => handleRetrieve());
                        }}
                      >
                        Hide
                      </button>
                    )}
                    <br />
                    {!!channel && (
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
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
  
  export default ChannelVideos;