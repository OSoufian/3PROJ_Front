import { Register, Login } from '@/components/Auth';
import Switch from '@/components/Switch';

function Connect() {
  const [showLogin, setShowLogin] = useState(true);

  const handleSwitchToggle = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="container flex justify-center items-center mt-30 bg-var(--bg-color) text-var(--text-color) gap-8">
      <div className={`card w-96 rounded-md shadow-lg p-4 bg-var(--card-bg-color) shadow-var(--card-shadow-color) ${showLogin ? '' : 'hidden'} border border-primary`}>
        <Login />
      </div>
      <div className={`card w-96 rounded-md shadow-lg p-4 bg-var(--card-bg-color) shadow-var(--card-shadow-color) ${showLogin ? 'hidden' : ''} border border-primary`}>
        <Register />
      </div>
      <Switch onChange={handleSwitchToggle} text={['login', 'register']} />
    </div>
  );
}

export default Connect;
