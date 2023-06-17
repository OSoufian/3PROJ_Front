import "@/styles/UploadVideo.css";
import { type ChannelType, type VideoType } from "@/types";
import { useEditVideo, useGetMeChannel, useGetVideosByChannel, useImageUpload, useVideoUpload } from "@/apis";
import envVars from "../../../public/env-vars.json"
// import FileDropZone from "../DropDown";
const baseURL = envVars["user-url"]

function UploadVideoCard() {

  const [channel, setChannel] = useState<ChannelType | undefined>()
  const [uploadedVideo, setuploadedVideo] = useState<FileList>()
  const [videoName, setVideoName] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [thumbnail, setThumbnail] = useState<string>('');
  
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && !!channel) {
      setuploadedVideo(event.target.files)
    }
  };

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!!event.target.files && !!channel) {
      useImageUpload(event.target.files[0], channel.OwnerId, (c: string) => {
        setThumbnail(c)
      });
    }
  };

  const handleSubmit = () => {
    if (uploadedVideo && channel) {
      useVideoUpload(uploadedVideo[0], channel.Id, (c: any) => {
        if (c.status === 200) {
          const id = c.id
          console.log(c.id)
          useGetVideosByChannel(channel?.Id, ["created_at"], (c: VideoType[]) => {
            const updatedVideos = c
            .filter((v: VideoType) => v.Id == id)
            const video = { ...updatedVideos[0], Icon: thumbnail, Name: videoName, Description: videoDescription } as VideoType;
            if (updatedVideos[0] && channel) {
              
              useEditVideo(video, channel.Id, (e: any) => {
                if (e.Id !== 0) {
                  setVideoName('');
                  setVideoDescription('');
                  setThumbnail('');
                  setuploadedVideo(undefined)

                  // Reset form fields visually
                  const thumbnailUpload = document.getElementById('Thumbnail-upload') as HTMLInputElement;
                  if (thumbnailUpload) {
                    thumbnailUpload.value = '';
                  }

                  const videoUpload = document.getElementById('Video-upload') as HTMLInputElement;
                  if (videoUpload) {
                    videoUpload.value = '';
                  }
                } else {
                  console.log('Error uploading video');
                }
              });
            }
          });
        } else {
          console.log('error');
        }
      });
    }
  };

  useEffect(() => {
    useGetMeChannel(sessionStorage.token ?? '', (c: ChannelType) => setChannel(c));
  }, [channel?.Id]);

  const handleVideoNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoName(event.target.value);
  };

  const handleVideoDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoDescription(event.target.value);
  };

  return (
    <div>
      <h3 className="input-title">Name</h3>
      <input placeholder="Name" type="string" className="videoName" value={videoName} onChange={handleVideoNameChange} />

      <h3 className="input-title">Description</h3>
      <input placeholder="Description" type="string" value={videoDescription} onChange={handleVideoDescriptionChange} />

      <div className="thumbnail-container">
        <h3 className="input-title">Thumbnail</h3>
        <img
          className="Thumbnail-image"
          src={thumbnail ? `${baseURL}/image?imagename=${thumbnail}` : `${baseURL}/image?imagename=default.png`}
          alt="Thumbnail"
        />
        {/* <div>
          <h1>TEST</h1>
        <FileDropZone />
        </div> */}
        <input id="Thumbnail-upload" type="file" accept="image/*" onChange={handleThumbnailChange} style={{display:'none'}} onDragOver={(event) => {
            event.preventDefault(); // Prevent default behavior to allow dropping

            console.log(event.target)
        }}/>
        <div className="upload-icon">
          <img src='https://cdn-icons-png.flaticon.com/512/126/126477.png' onClick={() => {
            document.getElementById('Thumbnail-upload')?.click();
          }}></img>
        </div>
      </div>

      <h3 className="input-title">Video File</h3>
      <input type="file" accept="video/*" id="Video-upload" onChange={handleVideoUpload} />

      <br />
      { uploadedVideo && videoName && thumbnail && <button className="save-btn" onClick={handleSubmit}>Save Video</button> }
    </div>
  );
}

export default UploadVideoCard;