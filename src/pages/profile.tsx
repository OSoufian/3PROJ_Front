import { useDeleteVideo, useGetUser, useGetVideo, useGetVideos, useLogin, useRegister, useVideoUpload } from '@/apis';
import useCreateChannel from '@/apis/Users/channels';
import "@/styles/Profile.css"

interface User {
  Id: number;
  Icon: string;
  Username: string;
  Email: string;
  Password: string;
  Incredentials: string;
  ValideAccount: boolean;
  Disable: boolean;
  Subscribtion?: any;
  Role?: any;
  Credentials?: any;
}

function WebAuthn() {

  const [userInput, setUserInput] = useState('');
  const [user, setUser] = useState<User | undefined>();
  const [videoList, setVideoList] = useState<string[] | null>()
  const [videoSrc, setVideoSrc] = useState<Blob>()

  const handleRetrieve = () => {
    useGetVideos((c: string[]) => {
      setVideoList(c)
    })
  }

  const handleRegister = () => {
    useRegister(userInput, (user: any) => {
      setUser(user)
    })
    handleRetrieve()
  };



  const handleLogin = () => {
    useLogin(userInput, (user: any) => {
      setUser(user)
    })
    handleRetrieve()
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setUser(undefined);

  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      useVideoUpload(event.target.files[0], (c: any) => {
        if (c === 200)
          event.target.files = null
        else
          console.log("error")
      });
      handleRetrieve()
    }
  };

  if (!!sessionStorage.token && !user) {
    useGetUser(sessionStorage.token, (c: any) => setUser(c))
    handleRetrieve()
  }

  return (
    <div style={{ marginBottom: 3 }}>
      {sessionStorage.token ? (
        <div>
          <h1>Not logged</h1>
          <Link to="/connect" className="connect-link">
            Connect
          </Link>
        </div>
      ) : (
        <div className="profile-container">
          <div className="profile-header">
            <img className="profile-icon" src={user?.Icon} alt="User icon" />
            <h1 className="profile-username">{user?.Username}</h1>
            <p className="profile-email">{user?.Email}</p>
          </div>
          <div className="profile-body">
            <button onClick={() => {
              useCreateChannel(sessionStorage.token, () => { })
            }} className='create-channel-btn'> Create a Channel</button>
            <br/>
            <input type="file" accept="video/*" onChange={handleVideoUpload} className='upload-btn'/> <br />

            {!!videoList && typeof videoList !== "string" && videoList.map((v: string, Index) => (
              <div key={Index} className='video-list'>
                <button onClick={() => useGetVideo(v, (c: Blob) => setVideoSrc(c))}>{v}</button>
                <button onClick={() => useDeleteVideo(v, () => {
                  handleRetrieve()
                })}> X </button>
                <br /></div>
            ))}

            {typeof videoList === "string" && (
              <p>{videoList}</p>
            )}

            {!!videoSrc && (<video src={URL.createObjectURL(videoSrc as (Blob | MediaSource))} controls crossOrigin='true' />)}
          </div>
        </div>
      )}
    </div>
  );
}

export default WebAuthn;
