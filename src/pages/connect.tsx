import React from 'react';
import Login from '../components/login';
import Register from '../components/register';
import '../components/Connect.css';

function Connect() {

  return (
    <div className="container">
      <div className="card">
        <Login />
      </div>
      <div className="card">
        <Register />
      </div>
    </div>
  );
}

export default Connect;