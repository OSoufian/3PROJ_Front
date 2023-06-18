import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetUser, useGetAllUsers, useGetAllConditionUsers, useEditMe, useAdminEditUser } from '@/apis';
import { User } from '@/types';
import '@/styles/admin.css';
import envVars from "../../public/env-vars.json"
const baseURL = envVars["user-url"]

interface Category {
  id: number;
  name: string;
}

function WebAuthn() {
  const categories = [
    {id: 1, name: "All"},
    {id: 2, name: "Online"},
    {id: 3, name: "Offline"},
    {id: 4, name: "Deactivated"},
    // {id: 4, name: "Deactivated"},
  ]

  const [activeCategory, setActiveCategory] = useState(1);
  const [user, setUser] = useState<User | undefined>();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();

  if (!!sessionStorage.token && !user) {
    useGetUser(sessionStorage.token, (c: any) => setUser(c))
  }

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category.id);
    if (category.id == 1) {
      handleGetAllUsers()
    }
    if (category.id == 2) {
      handleGetOnlineUsers()
    }
    if (category.id == 3) {
      handleGetOfflineUsers()
    }
    if (category.id == 4) {
      handleGetDeactivatedUsers()
    }
  };

  const handleGetOnlineUsers = () => {
    useGetAllConditionUsers(sessionStorage.token, "online=true", ((userList: User[]) => {
      setUsers(userList);
    }))
  }

  const handleGetOfflineUsers = () => {
    useGetAllConditionUsers(sessionStorage.token, "online=false", ((userList: User[]) => {
      setUsers(userList);
    }))
  }

  const handleGetDeactivatedUsers = () => {
    useGetAllConditionUsers(sessionStorage.token, "disable=true", ((userList: User[]) => {
      setUsers(userList);
    }))
  }

  const handleGetAllUsers = () => {
    useGetAllUsers(sessionStorage.token, (userList: User[]) => {
      setUsers(userList);
    })
  }

  useEffect(() => {
    useGetAllUsers(sessionStorage.token, (userList: User[]) => {
      setUsers(userList);
    })
  }, []);

  const handleUserClick = (selectedUser: User) => {
    setSelectedUser(selectedUser);
  };

  const handleBanUser = () => {
    if (selectedUser) {
      const updatedUser = {...selectedUser, Disable: !selectedUser.Disable}
      useAdminEditUser(sessionStorage.token, updatedUser, () => {})
    }
  }

  const handleEditUser = () => {
    if (selectedUser) {
      const updatedUser = {...selectedUser, Disable: !selectedUser.Disable}
      useAdminEditUser(sessionStorage.token, updatedUser, () => {})
    }
  }

  return (
    
    <div className="admin-container">
      {!sessionStorage.token ? (
        <div>
          <h1>Not logged</h1>
          <Link to="/connect" className="connect-link">
            Connect
          </Link>
        </div>
      ) : (
        <div className='admin-body'>
          <div className='panel'>
            <div className='container'>
              <ul>
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    to={``}
                    className={`item${activeCategory === category.id ? ' active' : ''} dark:text-#C2C2C2`}
                    onClick={() => {
                      handleCategoryClick(category);
                    }}
                  >
                    {category.name}
                  </Link>
                ))}
              </ul>
            </div>
          </div>
          <div className="admin-wrapper">
              <div className="user-list">
                {activeCategory === 1 && (
                  <h2>All Users</h2>
                )}
        
                {activeCategory === 2 && (
                  <h2>Online Users</h2>
                )}
                
                {activeCategory === 3 && (
                  <h2>Offline Users</h2>
                )}
            
                {activeCategory === 4 && (
                  <h2>Deactivated Users</h2>
                )}
                {users.map((user) => (
                  <div
                    key={user.Id}
                    className={`user-item ${selectedUser?.Id === user.Id ? 'selected' : ''}`}
                    onClick={() => handleUserClick(user)}
                  >
                    <img
                      src={user.Icon ? `${baseURL}/image?imagename=${user.Icon}` : `${baseURL}/image?imagename=default.png`}
                      alt={user.Username}
                      className="user-icon"
                    />
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
                      {selectedUser.Disable ? (
                        <button className="ban-btn" onClick={handleEditUser}>UnBan</button>
                        ) : (
                          <button className="ban-btn" onClick={handleBanUser}>Ban</button>
                        )}
                      <button className="delete-btn">Delete</button>
                    </div>
                  </div>
                ) : (
                  <p>Select a user to view details</p>
                )}
              </div>
            </div>
        </div>
        )}
      </div>
    );
  }
  
  export default WebAuthn;