import { useImageUpload, useEditChannel, useGetMeChannel } from '@/apis';
import { type ChannelType } from '@/types';
import "@/styles/EditChannelCardStyle.css"
import envVars from "../../../public/env-vars.json"
const baseURL = envVars["user-url"]

function EditChannelCard() {
  const [channel, setChannel] = useState<ChannelType | undefined>();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    useGetMeChannel(sessionStorage.token ?? '', (c: ChannelType) => setChannel(c));
  }, [channel?.Id]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (channel) {
      const updatedChannel = { ...channel, Description: e.target.value };
      setChannel(updatedChannel);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (channel) {
      const updatedChannel = { ...channel, Name: e.target.value };
      setChannel(updatedChannel);
    }
  };

  const handleSocialLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (channel) {
      const updatedChannel = { ...channel, SocialLink: e.target.value };
      setChannel(updatedChannel);
    }
  };

  const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!!event.target.files && !!channel) {
      useImageUpload(event.target.files[0], channel.OwnerId, (c: string) => {
        const updatedChannel = { ...channel, Banner: c };
        setChannel(updatedChannel);
      });
    }
  };

  const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!!event.target.files && !!channel) {
      useImageUpload(event.target.files[0], channel.OwnerId, (c: string) => {
        const updatedChannel = { ...channel, Icon: c };
        setChannel(updatedChannel);
      });
    }
  };

  const handleEditChannel = async () => {
    if (channel) {
      useEditChannel(sessionStorage.token, channel, (response: any) => {
        if (response) {
          if (response.Id === channel.Id) {
            setUpdateSuccess(true);
          }
        }
      });
    }
  };

  return (
    <div>
      <div className="banner-container">
        <h3 className="input-title">Banner</h3>
        <img
          className="banner-image"
          src={channel?.Banner ? `${baseURL}/image?imagename=${channel?.Banner}` : `${baseURL}/image?imagename=default.png`}
          alt="Banner"
        />
        <input id="banner-upload" type="file" accept="image/*" onChange={handleBannerChange} style={{ display: 'none' }} />
        <div className="upload-icon">
          <img
            src="https://cdn-icons-png.flaticon.com/512/126/126477.png"
            onClick={() => {
              document.getElementById('banner-upload')?.click();
            }}
            alt="Upload Banner"
          ></img>
        </div>
      </div>
      <br />
      <div className="icon-container">
        <h3 className="input-title">Icon</h3>
        <img
          className="channel-icon"
          src={channel?.Icon ? `${baseURL}/image?imagename=${channel?.Icon}` : `${baseURL}/image?imagename=default.png`}
          alt="Icon"
        />
        <input id="icon-upload" type="file" accept="image/*" onChange={handleIconChange} style={{ display: 'none' }} />
        <div className="upload-icon">
          <img
            src="https://cdn-icons-png.flaticon.com/512/126/126477.png"
            onClick={() => {
              document.getElementById('icon-upload')?.click();
            }}
            alt="Upload Icon"
          ></img>
        </div>
      </div>

      <h3 className="input-title">Name</h3>
      <input placeholder="Name" type="string" value={channel?.Name} onChange={handleNameChange} />

      <h3 className="input-title">SocialLink</h3>
      <input placeholder="Social link" type="string" value={channel?.SocialLink} onChange={handleSocialLinkChange} />

      <h3 className="input-title">Description</h3>
      <input placeholder="Description" type="string" value={channel?.Description} onChange={handleDescriptionChange} />

      <br />
      {!!channel && (
        <button className="save-btn" onClick={handleEditChannel}>
          Save Channel
        </button>
      )}

      {updateSuccess && (
        <div className="success-message">
          Channel updated successfully!
        </div>
      )}
    </div>
  );
}

export default EditChannelCard;