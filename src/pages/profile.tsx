import { useGetUser, useImageUpload } from '@/apis';
import "@/styles/Profile.css"
import { type User } from '@/types';

function Profile() {
  const [user, setUser] = useState<User | undefined>();
  const [iconPath, setIconPath] = useState<string | null>()

  if (!!sessionStorage.token && !user) {
    useGetUser(sessionStorage.token, (c: any) => setUser(c))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!!event.target.files && !!user) {
        useImageUpload(event.target.files[0], user.Id, (c: string) => {
          setIconPath(c)
        })
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
            <label htmlFor="upload-input">
              <img className="profile-icon" src={user?.Icon ? `http://127.0.0.1:3000/image?imagename=${user?.Icon}` : 'https://www.feteduviolon.com/wp-content/uploads/2023/02/placeholder-1.png'} alt="User icon" />
              <input id="upload-input" type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
            </label>
            <h1 className="profile-username">{user?.Username}</h1>
            <p className="profile-email">{user?.Email}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;