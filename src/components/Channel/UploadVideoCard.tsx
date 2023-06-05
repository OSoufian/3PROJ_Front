import "@/styles/UploadVideo.css";
import { type ChannelType, type VideoType } from "@/types";
import { useEditVideo, useGetMeChannel, useGetVideosByChannel, useImageUpload, useVideoUpload } from "@/apis";

function UploadVideoCard() {

  const [channel, setChannel] = useState<ChannelType | undefined>()
  const [uploadedVideo, setuploadedVideo] = useState<FileList>()
  const [currentVideo, setCurrentVideo] = useState<VideoType | undefined>()
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
        const updatedVideo = { ...currentVideo, Thumbnail: c } as VideoType;
        setCurrentVideo(updatedVideo);
      });
    }
  };

  const handleSubmit = () => {
    if (uploadedVideo && channel) {
      useVideoUpload(uploadedVideo[0], channel.Id, (c: any) => {
        console.log(c)
        if (c.status === 200) {
          const id = c.id
          console.log(id)
          useGetVideosByChannel(channel?.Id, ["creation_date"], (c: VideoType[]) => {
            const updatedVideos = c
            .filter((v: VideoType) => v.Id == id)
            setCurrentVideo(updatedVideos[0]);
            console.log(updatedVideos[0])
            const video = { ...updatedVideos[0], Icon: thumbnail, Name: videoName, Description: videoDescription } as VideoType;
            console.log(video)
            if (updatedVideos[0] && channel) {
              
              useEditVideo(video, channel.Id, (response: any) => {
                if (response === 202) {
                  setVideoName('');
                  setVideoDescription('');
                  setThumbnail('');
                  setuploadedVideo(undefined)
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
      <input placeholder="Name" type="string" onChange={handleVideoNameChange} />

      <h3 className="input-title">Description</h3>
      <input placeholder="Description" type="string" onChange={handleVideoDescriptionChange} />

      <div className="thumbnail-container">
        <h3 className="input-title">Thumbnail</h3>
        <img
          className="Thumbnail-image"
          src={currentVideo?.Icon ? `http://127.0.0.1:3000/image?imagename=${currentVideo?.Icon}` : 'http://127.0.0.1:3000/image?imagename=default.png'}
          alt="Thumbnail"
        />
        <input id="Thumbnail-upload" type="file" accept="image/*" onChange={handleThumbnailChange} style={{display:'none'}}/>
        <div className="upload-icon">
          <img src='https://cdn-icons-png.flaticon.com/512/126/126477.png' onClick={() => {
            document.getElementById('Thumbnail-upload')?.click();
          }}></img>
        </div>
      </div>

      <h3 className="input-title">Video File</h3>
      <input type="file" accept="video/*" onChange={handleVideoUpload} />

      <br />
      { uploadedVideo && <button className="save-btn" onClick={handleSubmit}>Save Video</button> }
    </div>
  );
}

export default UploadVideoCard;