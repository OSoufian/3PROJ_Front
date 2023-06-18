import "@/styles/Channel.css";
import { User, type ChannelType } from "@/types";
import { EditChannelCard, UploadVideoCard, Roles, ChannelVideos } from "./index";
import { useCreateChannel, useEditChannel, useGetMeChannel, useGetUserById, useImageUpload } from "@/apis";
import envVars from "../../../public/env-vars.json"
// import { cp } from "fs";
const baseURL = envVars["user-url"]

interface Category {
  id: number;
  name: string;
}

function Channel() {
  const categories = [
    {id: 1, name: "Videos"},
    {id: 2, name: "Roles"},
    {id: 3, name: "Edit Channel"},
    {id: 4, name: "Upload a video"}
  ]

  const [activeCategory, setActiveCategory] = useState(1);
  const [channel, setChannel] = useState<ChannelType | undefined>()
  const [description, setDescription] = useState<string>('')
  const [socialLink, setSocialLink] = useState<string>('')
  const [channelName, setChannelName] = useState<string>('')
  const [banner, setBanner] = useState<FileList | null>()
  const [icon, setIcon] = useState<FileList | null>()
  
  useEffect(() => {
    useGetMeChannel(sessionStorage.token ?? '', (c: ChannelType) => {
      useGetUserById(c.OwnerId, (user: User) => {
        const updatedChannel = {
          ...c,
          Owner: user
        }
        setChannel(updatedChannel);
      });
    });
  }, [channel?.Id]);


  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category.id);
  };
  
  const handleCreateChannel = () => {
    useCreateChannel(sessionStorage.token, async (c: ChannelType) => {
      if (banner) {
        await useImageUpload(banner[0], c.OwnerId, (v: string) => {
          c.Banner = v
        });
      }
      if (icon) {
        await useImageUpload(icon[0], c.OwnerId, (v: string) => {
          c.Icon = v
        });
      }
      if (channelName) c.Name = channelName
      if (description) c.Description = description
      if (socialLink) c.SocialLink = socialLink
      useEditChannel(sessionStorage.token, c, (c: ChannelType) => {})
    });
  }

  return (
    <div style={{ marginBottom: 3 }}>
      <h1>My Channel</h1>
      {!sessionStorage.token ? (
        <div>
          <h1>Not logged</h1>
          <Link to="/connect" className="connect-link">
            Connect
          </Link>
        </div>
      ) : (
        <div className="channel-container">
          <div className="channel-body">
            {!channel || channel.Id == 0 && (
              <div>
              <div className="banner-container">
                <h3 className="input-title">Banner</h3>
                <img
                  className="banner-image"
                  src={banner ? URL.createObjectURL(banner[0]) : `${baseURL}/image?imagename=default.png`}
                  alt="Banner"
                />
                <input id="banner-upload" type="file" accept="image/*" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setBanner(e.target.files)}} style={{display:'none'}}/>
                <div className="upload-icon">
                  <img src='https://cdn-icons-png.flaticon.com/512/126/126477.png' onClick={() => {
                    document.getElementById('banner-upload')?.click();
                  }}></img>
                </div>
              </div>
              <br />
              <div className="icon-container">
                <h3 className="input-title">Icon</h3>
                <img
                  className="channel-icon"
                  src={icon ? URL.createObjectURL(icon[0]) : `${baseURL}/image?imagename=default.png`}
                  alt="Icon"
                />
                <input id="icon-upload" type="file" accept="image/*" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setIcon(e.target.files)}} style={{display:'none'}}/>
                <div className="upload-icon">
                  <img src='https://cdn-icons-png.flaticon.com/512/126/126477.png' onClick={() => {
                    document.getElementById('icon-upload')?.click();
                  }}></img>
                </div>
              </div>
        
              <h3 className="input-title">Name</h3>
              <input placeholder="Name" type="string" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setChannelName(e.target.value)}} />
        
              <h3 className="input-title">SocialLink</h3>
              <input placeholder="Social link" type="string" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setDescription(e.target.value)}} />
        
              <h3 className="input-title">Description</h3>
              <input placeholder="Description" type="string" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {setSocialLink(e.target.value)}} />
        
              <br />
              {banner && icon && channelName && (
                <button className="save-btn" onClick={handleCreateChannel}>Create Channel</button>
              )}
            </div>
            )}
            {channel?.Id != 0 && channel?.Owner && <div>
              <div className='panel'>
                <div className='container'>
                  <ul>
                    {categories.map((category) => (
                    <Link key={category.id} to={``} className={`item${activeCategory === category.id ? ' active' : ''} dark:text-#C2C2C2`} onClick={() => {
                      handleCategoryClick(category);
                      }}>
                        {category.name}
                    </Link>
                    ))}
                  </ul>
                </div>
              </div>
              {activeCategory === 1 && (
                  <ChannelVideos channel={channel}/>
                )
              }
              {activeCategory === 2 && !channel?.Owner.Disable ? (
                  <Roles />
                ) : activeCategory === 2 && (
                  <div>
                  <div>Your account is currently disabled you cannot access to the roles</div>
                    <Link to="/profile" className="save-btn">
                      Reactivate Account
                    </Link>
                  </div>
                )
              }   

              {activeCategory === 3 && !channel?.Owner.Disable ? (
                  <EditChannelCard />
                ) : activeCategory === 3 && (
                  <div>
                  <div>Your account is currently disabled you cannot access to the Edit channel</div>
                    <Link to="/profile" className="save-btn">
                      Reactivate Account
                    </Link>
                  </div>
                )
              }

              {activeCategory === 4 && !channel?.Owner.Disable ? (
                  <UploadVideoCard channel={channel} />
                ) : activeCategory === 4 && (
                  <div>
                  <div>Your account is currently disabled you cannot access to the upload video</div>
                    <Link to="/profile" className="save-btn">
                      Reactivate Account
                    </Link>
                  </div>
                )
              }

            </div>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Channel;