import { useImageUpload, useEditChannel, useGetMeChannel } from '@/apis';
import { type ChannelType } from '@/types';
import "@/styles/EditChannelCardStyle.css"

function EditChannelCard() {
  const [channel, setChannel] = useState<ChannelType | undefined>();

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

  return (
    <div>
      <div className="banner-container">
        <h3 className="input-title">Banner</h3>
        <img
          className="banner-image"
          src={channel?.Banner ? `http://127.0.0.1:3000/image?imagename=${channel?.Banner}` : 'https://www.feteduviolon.com/wp-content/uploads/2023/02/placeholder-1.png'}
          alt="Banner"
        />
        <input type="file" accept="image/*" onChange={handleBannerChange} />
      </div>
      <div className="Icon-container">
        <h3 className="input-title">Icon</h3>
        <img
          className="channel-icon"
          src={channel?.Icon ? `http://127.0.0.1:3000/image?imagename=${channel?.Icon}` : 'https://www.feteduviolon.com/wp-content/uploads/2023/02/placeholder-1.png'}
          alt="Icon"
        />
        <input type="file" accept="image/*" onChange={handleIconChange} />
      </div>

      <h3 className="input-title">Name</h3>
      <input placeholder="Name" type="string" value={channel?.Name} onChange={handleNameChange} />

      <h3 className="input-title">SocialLink</h3>
      <input placeholder="Social link" type="string" value={channel?.SocialLink} onChange={handleSocialLinkChange} />

      <h3 className="input-title">Description</h3>
      <input placeholder="Description" type="string" value={channel?.Description} onChange={handleDescriptionChange} />

      <br />
      {!!channel && (
        <button className="save-btn" onClick={() => {
          useEditChannel(sessionStorage.token, channel, () => {});
        }}>Save Channel</button>
      )}
    </div>
  );
}

export default EditChannelCard;