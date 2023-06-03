import { useImageUpload, useEditChannel } from '@/apis';
import { type ChannelType } from '@/types';

function EditChannelCard({ channel }: { channel: ChannelType | undefined }) {
  const handleImageUpload = async (file: File, ownerId: number, Icon: string) => {
    try {
      const uploadedImage = await useImageUpload(file, ownerId, (c: string) => {
        Icon = c
      });
      if (uploadedImage) {
        const updatedChannel = { ...channel };
        updatedChannel.Banner = uploadedImage;
        // Update the channel state or perform any other necessary actions with the updated channel
      }
    } catch (error) {
      // Handle error
    }
  };

  const handleEditChannel = async () => {
    if (!!channel )
    try {
      await useEditChannel(sessionStorage.token, channel, () => { });
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div>
      <h3 className="input-title">Banner</h3>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleImageUpload(e.target.files[0], channel?.OwnerId || 0, channel?.Icon || '');
          }
        }}
      ></input>

      <h3 className="input-title">Icon</h3>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleImageUpload(e.target.files[0], channel?.OwnerId || 0, channel?.Icon || '');
          }
        }}
      ></input>

      <h3 className="input-title">Name</h3>
      <input
        placeholder={channel?.Name || ''}
        type="string"
        onChange={(e) => {
          const updatedChannel = { ...channel };
          updatedChannel.Name = e.target.value;
          // Update the channel state or perform any other necessary actions with the updated channel
        }}
      ></input>

      <h3 className="input-title">SocialLink</h3>
      <input
        placeholder={channel?.SocialLink || ''}
        type="string"
        onChange={(e) => {
          const updatedChannel = { ...channel };
          updatedChannel.SocialLink = e.target.value;
        }}
      ></input>

      <h3 className="input-title">Description</h3>
      <input
        placeholder={channel?.Description || ''}
        type="string"
        onChange={(e) => {
          const updatedChannel = { ...channel };
          updatedChannel.Description = e.target.value;
        }}
      ></input>

      <br />
      <button className="save-btn" onClick={handleEditChannel}>
        Save Channel
      </button>
    </div>
  );
}

export default EditChannelCard;