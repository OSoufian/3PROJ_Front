import { useEditVideo, useGetUser, useGetMeChannel, useImageUpload, useGetVideosByChannel } from '@/apis';
import "@/styles/EditVideo.css"
import { type User, type VideoType, type ChannelType } from '@/types';

import { useParams } from 'react-router-dom';
import envVars from "../../../public/env-vars.json"
const baseURL = envVars["user-url"]

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
    useGetVideosByChannel(channel?.Id, ["creation_date"], (c: VideoType[]) => {
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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentVideo) {
      const updatedVideo = { ...currentVideo, Name: e.target.value };
      setCurrentVideo(updatedVideo);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (currentVideo) {
      const updatedVideo = { ...currentVideo, Description: e.target.value };
      setCurrentVideo(updatedVideo);
    }
  };

  const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!!event.target.files && !!channel) {
      useImageUpload(event.target.files[0], channel.OwnerId, (c: string) => {
        setIconPath(c)
        const updateVideo = { ...currentVideo, Icon: c } as VideoType;
        setCurrentVideo(updateVideo);
      });
    }
  };

  return currentVideo ? (
    <div>
      <div className="input-div">
        <h4 className="input-title">Name: </h4>
        <input className="input" placeholder="Name" type="text" value={currentVideo.Name} onChange={handleNameChange} />
      </div>
      <div className="input-div">
        <h4 className="input-title">Description: </h4>
        <input className="input" placeholder="Description" type="text" value={currentVideo.Description} onChange={handleDescriptionChange} />
      </div>
      <div className="icon-div">
        <h3 className="input-title">Icon</h3>
        <img
          className="video-thumbnail"
          src={currentVideo.Icon ? `${baseURL}/image?imagename=${currentVideo.Icon}` : `${baseURL}/image?imagename=default.png`}
          alt={currentVideo.Name}
        />
        <input id="icon-upload" type="file" accept="image/*" onChange={handleIconChange} style={{display:'none'}}/>
        <div className="upload-icon">
          <img src='https://cdn-icons-png.flaticon.com/512/126/126477.png' onClick={() => {
            document.getElementById('icon-upload')?.click();
          }}></img>
        </div>
      </div>


      <Link to="/channel/">
        <button className='save-btn' onClick={() => {
          
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