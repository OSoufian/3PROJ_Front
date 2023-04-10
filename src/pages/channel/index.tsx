import { useDeleteVideo, useGetUser, useGetVideos, useVideoUpload } from '@/apis';
import { useCreateChannel, useGetChannelById, useGetMeChannel } from '@/apis/Users/channels';
import "@/styles/Profile.css"
import { type User, type VideoType, type ChannelType } from '@/types';

function Channel() {
  const [user, setUser] = useState<User | undefined>()
  const [videoList, setVideoList] = useState<VideoType[] | null>()
  const [hiddenVideos, setHiddenVideos] = useState<string[]>([]);
  const [blockedVideos, setBlockedVideos] = useState<string[]>([]);
  const [channel, setChannel] = useState<ChannelType | undefined>()

  useEffect(()=> {
    useGetMeChannel(sessionStorage.token ?? "", (c: ChannelType) => setChannel(c))
  }, [])

  const handleRetreiveChannel = (video: VideoType, c: Function) => {
    return useGetChannelById(video.ChannelId, c)
  }

  const handleRetrieve = () => {
    useGetVideos((c: VideoType[]) => {
      const updatedVideoList = c
        .filter((v: VideoType) => !hiddenVideos.includes(`${v.Id}`))
        .filter((v: VideoType) => !blockedVideos.includes(`${v.Id}`))
        .map((v: VideoType) => {
          const channel: ChannelType = {
              Id: 0,
              OwnerId: 0,
              Description: '',
              SocialLink: '',
              Banner: '',
              Icon: '',
              Subscribers: null
          }
          handleRetreiveChannel(v, (c: ChannelType) =>  {
            Object.assign(channel, c)
          })

          return {
            ...v,
            channelIcon: channel.Icon
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
            <button onClick={() => {
              useCreateChannel(sessionStorage.token, () => { })
            }} className='create-channel-btn'> Create a Channel</button>
            <br/>
            <div className='upload-btn'>
              <input type="file" accept="video/*" onChange={handleVideoUpload} />
            </div>

            {!!videoList && videoList.map((v: VideoType) => (
              <div key={v.Id} className='video-card'>
                <img src={v.Icon} alt={v.Name} />
                <h3>{v.Name}</h3>
                <p>{v.Description}</p>
                <p>{v.Views}</p>
                <p>{v.CreationDate}</p>
                <Link to={`/watch/${v.Id}`} key={v.Id}>
                  <button className='watch-btn'>Watch Now</button>
                </Link>
                <div className='dropdown'>
                  <button className='dropdown-btn'/>
                  <div className='dropdown-content'>
                    <a href='#' onClick={() => setHiddenVideos([...hiddenVideos, `${v.Id}`])}>Hide</a>
                    <a href='#' onClick={() => setBlockedVideos([...blockedVideos, `${v.Id}`])}>Block</a>
                  </div>
                </div>
                {!!channel && (
                <button onClick={() => useDeleteVideo(v.VideoURL, channel.Id, () => handleRetrieve())} className='delete-btn'>Delete</button>
                )}
              </div>
            ))}

          </div>
        </div>
      )}
    </div>
  );
}

export default Channel;
