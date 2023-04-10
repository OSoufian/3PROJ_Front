import { useGetUser } from '@/apis';
import "@/styles/Profile.css"
import { type User} from '@/types';
function WebAuthn() {

  const [user, setUser] = useState<User | undefined>();

  if (!!sessionStorage.token && !user) {
    useGetUser(sessionStorage.token, (c: any) => setUser(c))
  }

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
            <img className="profile-icon" src={user?.Icon} alt="User icon" />
            <h1 className="profile-username">{user?.Username}</h1>
            <p className="profile-email">{user?.Email}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WebAuthn;
