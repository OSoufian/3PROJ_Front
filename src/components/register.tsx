import { useGetVideos, useRegister} from '@/apis';

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

function Login() {
    const [username, setUsername] = useState('');
    const [userInput, setUserInput] = useState('');
    const [videoList, setVideoList] = useState<string[] | null>()
    const [user, setUser] = useState<User | undefined>();
  
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
        window.location.reload();
      };
  
    return (
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
        </div>
        <div className="form-group">
          <button onClick={handleRegister}>Register</button>
        </div>
      </div>
    );
  }

export default Login;