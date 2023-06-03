import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetUser } from '@/apis';
import { useGetAllUsers } from '@/apis/Users/user';
import { User } from '@/types';
import '@/styles/admin.css';

function WebAuthn() {
  const [user, setUser] = useState<User | undefined>();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  if (!!sessionStorage.token && !user) {
    useGetUser(sessionStorage.token, (c: any) => setUser(c))
  }

  useEffect(() => {
    useGetAllUsers((userList: User[]) => {
      setUsers(userList);
    })
  });

  const handleUserClick = (selectedUser: User) => {
    setSelectedUser(selectedUser);
  };

  return (
    <div className="profile-container">
      {!sessionStorage.token ? (
        <div>
          <h1>Not logged</h1>
          <Link to="/connect" className="connect-link">
            Connect
          </Link>
        </div>
      ) : (        
        <div className="profile-wrapper">
          <div className="user-list">
            <h2>Users</h2>
            {users.map((user) => (
              <div
                key={user.Id}
                className={`user-item ${selectedUser?.Id === user.Id ? 'selected' : ''}`}
                onClick={() => handleUserClick(user)}
              >
                <img src={user.Icon} alt={user.Username} className="user-icon" />
                <span className="user-name">{user.Username}</span>
              </div>
            ))}
          </div>
          <div className="user-details">
            {selectedUser ? (
              <div>
                <h2>{selectedUser.Username}</h2>
                <div className="user-informations">
                  <p>ID: {selectedUser.Id}</p>
                  <p>Username: {selectedUser.Username}</p>
                  <p>Email: {selectedUser.Email}</p>
                </div>
                <div className="user-actions">
                  <button className="edit-btn">Edit</button>
                  <button className="ban-btn">Ban</button>
                  <button className="delete-btn">Delete</button>
                </div>
              </div>
            ) : (
              <p>Select a user to view details</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default WebAuthn;