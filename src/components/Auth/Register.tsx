import { useRegister} from '@/apis';

function Register() {
    const [userInput, setUserInput] = useState<string>('');
    const navigate = useNavigate()

    const handleRegister = () => {
        useRegister(userInput, () => {
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
          <button onClick={handleRegister}>Register</button>
        </div>
      </div>
    );
  }

export default Register;