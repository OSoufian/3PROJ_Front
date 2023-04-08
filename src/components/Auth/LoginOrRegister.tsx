import { useState } from 'react';
import { useLogin, useRegister } from '@/apis';
import { useNavigate } from 'react-router-dom';

function LoginOrRegister() {
  const [userInput, setUserInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    
    try {
        useLogin(userInput, () => {
            navigate('/');
          });
    } catch (error) {
        useRegister(userInput, () => {
            navigate('/');
          });
    }
    
  };

  return (
    <div className="form-container">
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
      </div>
      <div className="form-group">
        <button onClick={handleSubmit}>Go</button>
      </div>
      
    </div>
  );
}

export default LoginOrRegister;
