import { useEditVideo, useGetUser, useGetMeChannel, useImageUpload, useGetVideosByChannel } from '@/apis';
import "@/styles/EditVideo.css"
import { type User, type VideoType, type ChannelType } from '@/types';

import { useParams } from 'react-router-dom';

function Channel() {
  const [user, setUser] = useState<User | undefined>()
  const [channel, setChannel] = useState<ChannelType | undefined>()
  const [iconPath, setIconPath] = useState<string | null>()
  const [currentVideo, setCurrentVideo] = useState<VideoType | undefined>()
  const params = useParams();

  useEffect(() => {
    useGetMeChannel(sessionStorage.token ?? "", (c: ChannelType) => setChannel(c))
  }, [])

  useEffect(() => {
    useGetVideosByChannel(channel?.Id, (c: VideoType[]) => {
      const updatedVideos = c
        .filter((v: VideoType) => v.Id == parseInt(params.id ?? ""))
      setCurrentVideo(updatedVideos[0]);
    });
  }, [channel?.Id, params.id]);

  useEffect(() => {
    if (!!sessionStorage.token && !user) {
      useGetUser(sessionStorage.token, (c: any) => setUser(c))
    }
  }, []);

  return currentVideo ? (
    <div>
      {/* {!!CurrentVideo && (<video src={URL.createObjectURL(CurrentVideo as (Blob | MediaSource))} controls crossOrigin='true' />)} */}
      <div className="input-div">
        <h4 className="input-title">Name: </h4>
        <input className="input" placeholder={currentVideo.Name} type="text" onChange={(e) => currentVideo.Name = e.target.value} />
      </div>
      <div className="input-div">
        <h4 className="input-title">Description: </h4>
        <input className="input" placeholder={currentVideo.Description} type="text" onChange={(e) => currentVideo.Description = e.target.value} />
      </div>
      <div className="icon-div">
        <div className="input-div">
          <h4 className="input-title">Icon: </h4>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (!!e.target.files && !!channel) {

                useImageUpload(e.target.files[0], channel.OwnerId, (c: string) => {
                  setIconPath(c)
                })
              }
            }}
          />
        </div>
        <img className="video-thumbnail" src={`http://127.0.0.1:3000/image?imagename=${currentVideo.Icon}`} alt={currentVideo.Name} />
      </div>


      <Link to="/channel/">
        <button className='save-btn' onClick={() => {

          console.log(iconPath)

          if (!!iconPath) {
            currentVideo.Icon = iconPath
          }

          useEditVideo(currentVideo, currentVideo.ChannelId, () => { })
        }}>Save</button>  
      </Link>
    </div>
  ) : (
    <h1>No video</h1>
  )
}

export default Channel;