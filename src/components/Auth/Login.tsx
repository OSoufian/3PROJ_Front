import { useLogin} from '@/apis';

function Login() {
    const [userInput, setUserInput] = useState('');
    const navigate = useNavigate()

    const handleLogin = () => {
        useLogin(userInput, () => {
          navigate("/")
        })
      };
  
    return (
      <div className="form-container">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
        </div>
        <div className="form-group">
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
  }

export default Login;