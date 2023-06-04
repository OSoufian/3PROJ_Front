import "@/styles/Channel.css";
import ChannelVideos from "./ChannelVideos";
import { type ChannelType } from "@/types";
import { useCreateChannel, useGetMeChannel } from "@/apis";
import EditChannelCard from "./EditChannelCard";
import UploadVideoCard from "./UploadVideoCard";

interface Category {
  id: number;
  name: string;
}

function Channel() {
  const categories = [
    {id: 1, name: "Vidéos"},
    {id: 2, name: "A propos"},
    {id: 3, name: "Modifier"},
    {id: 4, name: "Ajouter une vidéo"}
  ]

  const [activeCategory, setActiveCategory] = useState(1);
  const [channel, setChannel] = useState<ChannelType | undefined>()
  
  useEffect(() => {
    useGetMeChannel(sessionStorage.token ?? '', (c: ChannelType) => setChannel(c));
  }, [channel?.Id]);
  
  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category.id);
  };

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
              <button
                onClick={() => {
                  useCreateChannel(sessionStorage.token, () => {});
                }}
                className="create-channel-btn"
              >
                Create a Channel
              </button>
            )}
            {channel?.Id != 0 && <div>
              <div className='panel'>
                <div className='container'>
                  <ul>
                    {categories.map((category) => (
                    // <Link key={category.id} to={`/category/${category.id}`} className={`item${activeCategory === category.id ? ' active' : ''}`} onClick={() => handleCategoryClick(category)}>
                    <Link key={category.id} to={``} className={`item${activeCategory === category.id ? ' active' : ''} dark:text-#C2C2C2`} onClick={() => {
                      handleCategoryClick(category)
                      console.log(channel)
                      }}>
                        {category.name}
                    </Link>
                    ))}
                  </ul>
                </div>
              </div>
              {activeCategory === 1 && (
                  <ChannelVideos />
              )
              }

              {activeCategory === 3 && (
                  <EditChannelCard />
              )
              }

              {activeCategory === 4 && (
                <UploadVideoCard />
              )}

            </div>}
          </div>
        </div>
      )}
    </div>
  );
}

export default Channel;