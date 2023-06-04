import "@/styles/UploadVideo.css";
import { type ChannelType, type VideoType } from "@/types";
import { useEditVideo, useGetMeChannel, useGetVideosByChannel, useImageUpload, useVideoUpload } from "@/apis";

interface PartialVideo {
    Name: string;
    Description: string;
    Icon: string;
    VideoURL: string;
    ChannelId: number;
}

function UploadVideoCard() {

  const [channel, setChannel] = useState<ChannelType | undefined>()
  const [currentVideo, setCurrentVideo] = useState<VideoType | undefined>()
  const [videoName, setVideoName] = useState('');
  const [videoDescription, setVideoDescription] = useState('');
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  var newVideo : PartialVideo;
  
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && !!channel) {
      useVideoUpload(event.target.files[0], channel.Id, (c: any) => {
        if (c === 200) {
        //   newVideo.VideoURL = `${Date.now()}-${event.target.files[0].name}`
          event.target.files = null;
        } else {
          console.log('error');
        }
      });
    }
  };

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!!event.target.files && !!channel) {
      useImageUpload(event.target.files[0], channel.OwnerId, () => {
        if (event.target.files) {
            setThumbnail(event.target.files[0]);
            // thumbnail? newVideo.Icon = thumbnail.name : ""
        }
      });
      console.log(newVideo)
    }
  };

  useEffect(() => {
    useGetVideosByChannel(channel?.Id, (c: VideoType[]) => {
      const updatedVideos = c
        .filter((v: VideoType) => v.Name == newVideo.Name)
      setCurrentVideo(updatedVideos[0]);
    });
  });

  const handleSubmit = () => {
    if (currentVideo && channel) {
      useEditVideo(currentVideo, channel.Id, (response: any) => {
        if (response === 200) {
          setVideoName('');
          setVideoDescription('');
          setThumbnail(null);
        } else {
          console.log('Error uploading video');
        }
      });
    }
  };

  useEffect(() => {
    useGetMeChannel(sessionStorage.token ?? '', (c: ChannelType) => setChannel(c));
  }, [channel?.Id]);

  const handleVideoNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoName(event.target.value);
    // newVideo.Name = videoName;
  };

  const handleVideoDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoDescription(event.target.value);
    // newVideo.Description = videoDescription;
  };

  return (
    <div>
      <h3 className="input-title">Name</h3>
      <input placeholder="Name" type="string" onChange={handleVideoNameChange} />

      <h3 className="input-title">Description</h3>
      <input placeholder="Description" type="string" onChange={handleVideoDescriptionChange} />

      <div className="Thumbnail-container">
        <h3 className="input-title">Thumbnail</h3>
        <img
          className="Thumbnail-image"
          src={currentVideo?.Icon ? `http://127.0.0.1:3000/image?imagename=${currentVideo?.Icon}` : 'http://127.0.0.1:3000/image?imagename=default.png'}
          alt="Thumbnail"
        />
        <input type="file" accept="image/*" onChange={handleThumbnailChange} />
      </div>

      <h3 className="input-title">Video File</h3>
      <input type="file" accept="video/*" onChange={handleVideoUpload} />

      <br />
      { currentVideo && <button className="save-btn" onClick={handleSubmit}>Save Video</button> }
    </div>
  );
}

export default UploadVideoCard;