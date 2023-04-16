import { useEditVideo, useGetUser, useGetMeChannel, useImageUpload, useGetVideosByChannel} from '@/apis';
import "@/styles/Profile.css"
import { type User, type VideoType, type ChannelType } from '@/types';

import { useParams } from 'react-router-dom';

function Channel() {
  const [user, setUser] = useState<User | undefined>()
  const [channel, setChannel] = useState<ChannelType | undefined>()
  const [iconFile, setIconFile] = useState<FileList | null>()
  const [iconPath, setIconPath] = useState<string | null>()
  const [currentVideo, setCurrentVideo] = useState<VideoType | undefined>()
  const params = useParams();
  
  
  useEffect(() => {
    
    useGetMeChannel(sessionStorage.token ?? "", (c: ChannelType) => setChannel(c))
    
  }, [])
  
  useEffect(() => {
    useGetVideosByChannel(channel?.Id, (c: VideoType[]) => {
      const updatedVideos = c
        .filter((v: VideoType) => v.Id == parseInt(params.id ?? "") )
        setCurrentVideo(updatedVideos[0]);
    });
  }, []);

  if (!!sessionStorage.token && !user) {
    useGetUser(sessionStorage.token, (c: any) => setUser(c))
  }


  return currentVideo ? (
    <div>
        {/* {!!CurrentVideo && (<video src={URL.createObjectURL(CurrentVideo as (Blob | MediaSource))} controls crossOrigin='true' />)} */}
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
        }}>Save</button>
    </div>
  ) : (
    <h1>No video</h1>
  )
}

export default Channel;