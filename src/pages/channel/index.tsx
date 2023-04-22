import { useDeleteVideo, useGetUser, useVideoUpload, useCreateChannel, useGetChannelById, useGetMeChannel, useImageUpload, useEditChannel, useGetVideosByChannel } from '@/apis';
import "@/styles/Profile.css"
import { type User, type VideoType, type ChannelType } from '@/types';


function Channel() {
  const [user, setUser] = useState<User | undefined>()
  const [videoList, setVideoList] = useState<VideoType[] | null>()
  const [hiddenVideos, setHiddenVideos] = useState<string[]>([]);
  const [blockedVideos, setBlockedVideos] = useState<string[]>([]);
  const [channel, setChannel] = useState<ChannelType | undefined>()

  useEffect(() => {

    useGetMeChannel(sessionStorage.token ?? "", (c: ChannelType) => setChannel(c))

  }, [])

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

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && !!channel) {

      useVideoUpload(event.target.files[0], channel.Id, (c: any) => {
        if (c === 200)
          event.target.files = null
        else
          console.log("error")
      });
      handleRetrieve()
    }
  };

  if (!!sessionStorage.token && !user) {
    useGetUser(sessionStorage.token, (c: any) => setUser(c))
    handleRetrieve()
  }


  return (
    <div style={{ marginBottom: 3 }}>
      <h1>My Channel</h1>
      {!sessionStorage.token ? (
        <div>
          <h1>Not logged</h1>
          <Link to="/connect" className="connect-link">
            Connect
          </Link>
        </div>
      ) : (
        <div className="profile-container">
          <div className="profile-body">
            {!channel && (<button onClick={() => {
              useCreateChannel(sessionStorage.token, () => { })
            }} className='create-channel-btn'> Create a Channel</button>
            ) || (!!channel && (
              <div>
                <h3 className="input-title">Banner</h3>
                <input type="file" accept="image/*" onChange={(e) => {
                  if (!!e.target.files) {
                    useImageUpload(e.target.files[0], channel.OwnerId, (c: string) => {
                      channel.Banner = c
                    })
                  }
                }}></input>

                <h3 className="input-title">Icon</h3>
                <input type="file" accept="image/*" onChange={(e) => {
                  if (!!e.target.files) {
                    useImageUpload(e.target.files[0], channel.OwnerId, (c: string) => {
                      channel.Icon = c
                    })
                  }
                }}></input>

                <h3 className="input-title">Name</h3>
                <input placeholder={channel.Name} type='string' onChange={
                  (e) => channel.Name = e.target.value
                }></input>

                <h3 className="input-title">SocialLink</h3>
                <input placeholder={channel.SocialLink} type='string' onChange={
                  (e) => channel.SocialLink = e.target.value
                }></input>

                <h3 className="input-title">Description</h3>
                <input placeholder={channel.Description} type='string' onChange={
                  (e) => channel.Description = e.target.value
                }></input>

                <br />
                <button className='save-btn' onClick={() => {
                  useEditChannel(sessionStorage.token, channel, () => { })
                }}>Save Channel</button>

              </div>
            ))
            }
            <br />

            <h3 className="input-title">Upload a video</h3>
            <div>
              <input type="file" accept="video/*" onChange={handleVideoUpload} />
            </div>


            <h2 className='your-videos-title'>Your Videos</h2>
            <div className='video-list'>
            {!!videoList && videoList.map((v: VideoType) => (
              <div key={v.Id} className='video-card'>
                <img src={`http://127.0.0.1:3000/files?filename=${v.Icon}`} alt={v.Name} />
                <h3>{v.Name}</h3>
                <h1>{v.Id}</h1>
                <p>{v.Description}</p>
                <p>{v.Views}</p>
                <p>{v.CreatedAt}</p>
                <Link to={`/watch/${v.Id}`} key={v.Id}>
                  <button className='watch-btn'>Watch Now</button>
                </Link>
                {!!channel && (
                  <button onClick={() => useDeleteVideo(v.VideoURL, channel.Id, () => handleRetrieve())} className='delete-btn'>Delete</button>
                )}
                <div className='dropdown'>
                  <button className='dropdown-btn' />
                  <div className='dropdown-content'>
                    <Link to={`/channel/${v.Id}`} key={v.Id} className='watch-btn'>
                      Edit
                    </Link>
                    <a href='#' onClick={() => setHiddenVideos([...hiddenVideos, `${v.Id}`])}>Hide</a>
                    <a href='#' onClick={() => setBlockedVideos([...blockedVideos, `${v.Id}`])}>Block</a>
                  </div>
                </div>                
              </div>
            ))}

            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default Channel;
