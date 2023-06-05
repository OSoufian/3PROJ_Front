import { useEditMe, useGetUser, useImageUpload } from '@/apis';
import "@/styles/Profile.css"
import { type User } from '@/types';

function Profile() {
  const [user, setUser] = useState<User | undefined>();

  if (!!sessionStorage.token && !user) {
    useGetUser(sessionStorage.token, (c: any) => setUser(c))
  }

  const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!!event.target.files && !!user) {
      useImageUpload(event.target.files[0], user.Id, (c: string) => {
        const updatedUser = { ...user, Icon: c };
        setUser(updatedUser);
        useEditMe(sessionStorage.token, user, () => {})
      });
    }
  };

  return (
    <div style={{ marginBottom: 3 }}>
      {!sessionStorage.token ? (
        <div>
          <h1>Not logged</h1>
          <Link to="/connect" className="connect-link">
            Connect
          </Link>
        </div>
      ) : (
        <div className="profile-container">
          <div className="profile-header">
            <div className="icon-container">
              <img
                className="profile-icon"
                src={user?.Icon ? `http://127.0.0.1:3000/image?imagename=${user?.Icon}` : 'http://127.0.0.1:3000/image?imagename=default.png'}
                alt="Icon"
              />
              <input id="icon-upload" type="file" accept="image/*" onChange={handleIconChange} style={{display:'none'}}/>
              <div className="upload-icon">
                <img src='https://cdn-icons-png.flaticon.com/512/126/126477.png' onClick={() => {
                  document.getElementById('icon-upload')?.click();
                }}></img>
              </div>
            </div>
            <h1 className="profile-username">{user?.Username}</h1>
            <p className="profile-email">{user?.Email}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;