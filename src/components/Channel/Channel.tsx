import EditChannelCard from './EditChannelCard';
import ChannelVideos from './ChannelVideos';
import { ChannelType } from '@/types';
import { useCreateChannel, useGetMeChannel } from '@/apis';

function Channel() {
  const [channel, setChannel] = useState<ChannelType | undefined>()
  
  useEffect(() => {
    useGetMeChannel(sessionStorage.token ?? "", (c: ChannelType) => setChannel(c))
  }, [])

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
        <div className="profile-container">
          <div className="profile-body">
            {!channel && (
              <button
                onClick={() => {
                  useCreateChannel(sessionStorage.token, () => {});
                }}
                className="create-channel-btn"
              >
                Create a Channel
              </button>
            )}
            {!!channel && (
              <div className="about-section">
                <EditChannelCard
                  channel={channel}
                />
              </div>
            )}

            <ChannelVideos
              channel={channel}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Channel;