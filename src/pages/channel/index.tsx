import { useDeleteVideo, useEditVideo, useGetUser, useGetVideo, useGetVideos, useVideoUpload, useCreateChannel, useGetChannelById, useGetMeChannel, useImageUpload, useEditChannel } from '@/apis';
import "@/styles/Profile.css"
import { type User, type VideoType, type ChannelType } from '@/types';


function Channel() {
  const [user, setUser] = useState<User | undefined>()
  const [videoList, setVideoList] = useState<VideoType[] | null>()
  const [hiddenVideos, setHiddenVideos] = useState<string[]>([]);
  const [blockedVideos, setBlockedVideos] = useState<string[]>([]);
  const [channel, setChannel] = useState<ChannelType | undefined>()
  const [currentVideo, setCurrent] = useState<VideoType | undefined>()
  const [videoSrc, setVideoSrc] = useState<Blob | undefined>()
  const [iconFile, setIconFile] = useState<FileList | null>()
  const [iconPath, setIconPath] = useState<string | null>()

  useEffect(() => {

    useGetMeChannel(sessionStorage.token ?? "", (c: ChannelType) => setChannel(c))

  }, [])

  useEffect(() => {
    useGetVideos((c: VideoType[]) => {
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
    useGetVideos((c: VideoType[]) => {
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


  return !currentVideo ? (
    <div style={{ marginBottom: 3 }}>
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
                <h2>Banner</h2>
                <input type="file" accept="image/*" onChange={(e) => {
                  if (!!e.target.files) {
                    useImageUpload(e.target.files[0], channel.OwnerId, (c: string) => {
                      channel.Banner = c
                    })
                  }
                }}></input>

                <h2>Icon</h2>
                <input type="file" accept="image/*" onChange={(e) => {
                  if (!!e.target.files) {
                    useImageUpload(e.target.files[0], channel.OwnerId, (c: string) => {
                      channel.Icon = c
                    })
                  }
                }}></input>

                <h2>Name</h2>
                <input placeholder={channel.Name} type='string' onChange={
                  (e) => channel.Name = e.target.value
                }></input>

                <h2>SocialLink</h2>
                <input placeholder={channel.SocialLink} type='string' onChange={
                  (e) => channel.SocialLink = e.target.value
                }></input>

                <h2>Description</h2>
                <input placeholder={channel.Description} type='string' onChange={
                  (e) => channel.Description = e.target.value
                }></input>

                <br />
                <button onClick={() => {

                  useEditChannel(sessionStorage.token, channel, () => { })
                }}>SAVE Channel</button>

              </div>
            ))
            }
            <br />
            <div className='upload-btn'>
              <input type="file" accept="video/*" onChange={handleVideoUpload} />
            </div>

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
                    <button className='watch-btn' onClick={() => {
                      setCurrent(v)
                      useGetVideo(v.VideoURL, (c: Blob) => {
                        setVideoSrc(c)
                      })

                    }}> Edit</button>
                    <a href='#' onClick={() => setHiddenVideos([...hiddenVideos, `${v.Id}`])}>Hide</a>
                    <a href='#' onClick={() => setBlockedVideos([...blockedVideos, `${v.Id}`])}>Block</a>
                  </div>
                </div>                
              </div>
            ))}

          </div>
        </div>
      )}
    </div>
  ) : (
    <div>
      {/* {!!videoSrc && (<video src={URL.createObjectURL(videoSrc as (Blob | MediaSource))} controls crossOrigin='true' />)} */}
      <img src={`http://127.0.0.1:3000/files?filename=${currentVideo.Icon}`} alt={currentVideo.Name} />
      <div>
        <h4>Name: </h4>
        <input placeholder={currentVideo.Name} onChange={(e) => currentVideo.Name = e.target.value} />
      </div>
      <div>
        <h4>Descirption: </h4>
        <input placeholder={currentVideo.Description} type="text" onChange={(e) => currentVideo.Description = e.target.value} />
      </div>
      <div>
        <h4>Icon: </h4>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setIconFile(e.target.files)}
        />
      </div>


      <button onClick={() => {

        if (!!iconFile && !!channel) {

          useImageUpload(iconFile[0], channel.OwnerId, (c: string) => {
            setIconPath(c)
          })
        }

        if (!!iconPath) {
          currentVideo.Icon = iconPath
        }

        useEditVideo(currentVideo, currentVideo.ChannelId, () => { })

        setCurrent(undefined)
      }}>Save</button>
    </div>
  )
}

export default Channel;
