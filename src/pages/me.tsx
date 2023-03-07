import { useState } from 'react';
import { useDeleteVideo, useGetUser, useGetVideo, useGetVideos, useLogin, useRegister, useVideoUpload } from '@/apis';

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
      {!sessionStorage.token ? (
        <div>
          <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <p>User Info:</p>
          <p>Username: {user?.Username}</p>
          <p>Email: {user?.Email}</p>
          <input type="file" accept="video/*" onChange={handleVideoUpload} /> <br/>

          {!!videoList && typeof videoList !== "string" && videoList.map((v: string, Index) => (
            <div key={Index}>
              <button onClick={()  => useGetVideo(v, (c: Blob) => setVideoSrc(c))}>{v}</button>
              <button onClick={() => useDeleteVideo(v, () => {
                handleRetrieve()
              })}> X </button>
            <br /></div>
          ))}

          {typeof videoList === "string" && (
            <p>{videoList}</p>
          )}

          {!!videoSrc && (<video src={URL.createObjectURL(videoSrc as (Blob | MediaSource))} controls crossOrigin='true'/>)}

          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default WebAuthn;
