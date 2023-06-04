import { useState } from 'react';
import { useLogin, useRegister } from '@/apis';
import { useNavigate } from 'react-router-dom';
import '@/styles/LoginOrRegister.css';

function LoginOrRegister() {
  const [userInput, setUserInput] = useState('');
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    useLogin(userInput, (returnValue: boolean) => {
      if (!returnValue) {
        useRegister(userInput, (isSucessed: boolean) => {
          if (!isSucessed) {
            alert('Fail');
          } else {
            navigate('/');
          }
        });
      } else {
        navigate('/');
      }
    });
  };

  return (
    <div className="form-container">
      <div className="form-group">
        <h1>Connect</h1>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="form-group">
        <button onClick={handleSubmit}>OK</button>
      </div>
    </div>
  );
}

export default LoginOrRegister;
