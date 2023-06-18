import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGetUser, useGetAllUsers, useGetAllConditionUsers, useAdminEditUser, useAdminGetVideosByUser, useGetChannelById, useAdminGetUserChannel, useEditVideo, useDeleteVideo, useGetVideos } from '@/apis';
import { ChannelType, User, VideoType } from '@/types';
import '@/styles/admin.css';
import envVars from "../../public/env-vars.json";
const baseURL = envVars["user-url"];

interface Category {
  id: number;
  name: string;
}

function Admin() {
  const categories = [
    { id: 1, name: "All" },
    { id: 2, name: "Online" },
    { id: 3, name: "Offline" },
    { id: 4, name: "Deactivated" },
    { id: 5, name: "Monitoring" },
  ];

  const [activeCategory, setActiveCategory] = useState(1);
  const [user, setUser] = useState<User | undefined>();
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [editMode, setEditMode] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [userVideos, setUserVideos] = useState<VideoType[]>();
  const [userNumVideos, setUserNumVideos] = useState<number>(0);
  const [userVideosSize, setUserVideosSize] = useState<number>(0);
  const [numUsers, setNumUsers] = useState<number>(0);
  const [numVideos, setNumVideos] = useState<number>(0);
  const [totalVideosSize, setTotalVideosSize] = useState<number>(0);

  if (!!sessionStorage.token && !user) {
    useGetUser(sessionStorage.token, (c: any) => setUser(c));
  }

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category.id);
    if (category.id === 1) {
      setSelectedUser(undefined)
      setUserVideos(undefined)
      handleGetAllUsers();
    }
    if (category.id === 2) {
      setSelectedUser(undefined)
      setUserVideos(undefined)
      handleGetOnlineUsers();
    }
    if (category.id === 3) {
      setSelectedUser(undefined)
      setUserVideos(undefined)
      handleGetOfflineUsers();
    }
    if (category.id === 4) {
      setSelectedUser(undefined)
      setUserVideos(undefined)
      handleGetDeactivatedUsers();
    }
  };

  const handleGetOnlineUsers = () => {
    useGetAllConditionUsers(sessionStorage.token, "online=true", (userList: User[]) => {
      setUsers(userList);
    });
  };

  const handleGetOfflineUsers = () => {
    useGetAllConditionUsers(sessionStorage.token, "online=false", (userList: User[]) => {
      setUsers(userList);
    });
  };

  const handleGetDeactivatedUsers = () => {
    useGetAllConditionUsers(sessionStorage.token, "disable=true", (userList: User[]) => {
      setUsers(userList);
    });
  };

  const handleGetAllUsers = () => {
    useGetAllUsers(sessionStorage.token, (userList: User[]) => {
      setUsers(userList);
    });
  };

  useEffect(() => {
    useGetAllUsers(sessionStorage.token, (userList: User[]) => {
      setUsers(userList);
      setNumUsers(userList.length)
    });
    useGetVideos((v: VideoType[]) => {
      const totalSize = v.reduce((sum, video) => sum + Number((video.Size / 1048576).toFixed(2)), 0);
      setTotalVideosSize(Number(totalSize.toFixed(2)));
      setNumVideos(v.length)}
      )
  }, []);

  const handleUserClick = (selected: User) => {
    if (selected.Id === selectedUser?.Id) {
      setSelectedUser(undefined);
      setEditMode(false); // Unselect user and disable edit mode
      setPassword(selectedUser.Password);
      setEmail(selectedUser.Email);
    } else {
      setSelectedUser(selected);
      setEditMode(false); // Select user and disable edit mode
      setPassword(selected.Password);
      setEmail(selected.Email);
      setUserVideos(undefined)
    }
  };

  const handleEditUser = () => {
    if (selectedUser) {
      setEditMode(true); // Enable edit mode
      setPassword(selectedUser.Password);
      setEmail(selectedUser.Email);
    }
  };

  const handleBanUser = () => {
    if (selectedUser) {
      const updatedUser = { ...selectedUser, Disable: !selectedUser.Disable };
      useAdminEditUser(sessionStorage.token, updatedUser, () => {});
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedUser) {
      setPassword(e.target.value);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedUser) {
      setEmail(e.target.value);
    }
  };

  const handleGetUserVideos = (selected: User) => {
    useAdminGetUserChannel(selected, (c: ChannelType) => {
      useAdminGetVideosByUser(c.Id, ["created_at ASC"], (v: VideoType[]) => {
        const updatedUser = {...selected, Channel: c}
        setSelectedUser(updatedUser)
        setUserVideos(v)
      })
    })
  }

  const handleSaveUser = () => {
    if (selectedUser) {
      const updatedUser: User = {
        ...selectedUser,
        Password: password,
        Email: email,
      };
      useAdminEditUser(sessionStorage.token, updatedUser, () => {
        setEditMode(false); // Disable edit mode after saving
        selectedUser.Password = password;
        selectedUser.Email = email;
      });
    }
  };

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
        <div className="admin-body">
          <div className="panel">
            <div className="container">
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
          {activeCategory != 5 ? (
          <div className="admin-wrapper">
            <div className="user-list-container">
              <div className="user-list">
                {activeCategory === 1 && <h2>All Users</h2>}

                {activeCategory === 2 && <h2>Online Users</h2>}

                {activeCategory === 3 && <h2>Offline Users</h2>}

                {activeCategory === 4 && <h2>Deactivated Users</h2>}
                <div>
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
              </div>
            </div>
            <div className="user-details">
              {selectedUser ? (
                <div>
                  <h2>{selectedUser.Username}</h2>
                  <div className="user-informations">
                    <p>ID: {selectedUser.Id}</p>
                    {editMode ? (
                      <>
                        <p>
                          Password:{' '}
                          <input type="text" value={password} onChange={handlePasswordChange} />
                        </p>
                        <p>
                          Email:{' '}
                          <input type="text" value={email} onChange={handleEmailChange} />
                        </p>
                      </>
                    ) : (
                      <>
                        <p>Password: {selectedUser.Password}</p>
                        <p>Email: {selectedUser.Email}</p>
                      </>
                    )}
                  </div>
                  <div className="user-actions">
                    {!editMode ? (
                      <button className="edit-btn" onClick={handleEditUser}>
                        Edit
                      </button>
                    ) : (
                      <button className="edit-btn" onClick={handleSaveUser}>
                        Save
                      </button>
                    )}
                    {selectedUser.Disable ? (
                      <button className="ban-btn" onClick={handleBanUser}>
                        UnBan
                      </button>
                    ) : (
                      <button className="ban-btn" onClick={handleBanUser}>
                        Ban
                      </button>
                    )}
                    <button className="delete-btn">Delete</button>
                    <button className="edit-btn" onClick={() => handleGetUserVideos(selectedUser)}>Videos</button>
                  </div>
                </div>
              ) : (
                <p>Select a user to view details</p>
              )}
            </div>
            <div>
              { selectedUser && <div className="admin-video-list">
                {!!userVideos &&
                  userVideos.map((v: VideoType) => (
                    <div key={v.Id} className="video-card">
                      <img
                        className="w-full h-40 sm:h-52 object-cover"
                        src={v.Icon ? `${baseURL}/image?imagename=${v.Icon}` : `${baseURL}/image?imagename=default.png`}
                        alt={v.Name}
                      />
                      <div className="video-title">
                        <h3>{v.Name}</h3>
                      </div>  
                      <div className="video-hidden"> <p>{v.IsHide ? "[Hidden]" : ""}</p></div>
                      <div className="video-hidden"> <p>{v.IsBlock ? "[Blocked]" : ""}</p></div>
                      <div className="video-description">
                        <p>{v.Description}</p>
                      </div>                
                      <p>{`${v.Views} ${v.Views > 1 ? 'views' : 'view'}`}</p>
                      <p>{v.CreationDate}</p>
                      <Link to={`/watch/${v.Id}`} key={v.Id}>
                        <button className="watch-btn">Watch Now</button>
                      </Link>
                      {!!selectedUser.Channel && (
                        <button onClick={() => useDeleteVideo(v.VideoURL, selectedUser.Channel.Id, () => handleGetUserVideos(selectedUser))} className="delete-btn">
                          Delete
                        </button>
                      )}
                      <div className="dropdown">
                        <button className="dropdown-btn" />
                        <div className="dropdown-content">
                          {!!selectedUser.Channel && (
                            <div>
                              {!!v.IsHide ? (
                                <button
                                  onClick={() => {
                                    v.IsHide = false;
                                    useEditVideo(v, selectedUser.Channel.Id, () => handleGetUserVideos(selectedUser)); 
                                  }}
                                >
                                  Unhide
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    v.IsHide = true;
                                    useEditVideo(v, selectedUser.Channel.Id, () => handleGetUserVideos(selectedUser));
                                  }}
                                >
                                  Hide
                                </button>
                              )}
                            </div>
                            
                          )}
                          <br />
                          {!!selectedUser.Channel && (
                            <div>
                              {!!v.IsBlock ? (
                                <button
                                  onClick={() => {
                                    v.IsBlock = false;
                                    useEditVideo(v, selectedUser.Channel.Id, () => handleGetUserVideos(selectedUser)); 
                                  }}
                                >
                                  Unblock
                                </button>
                              ) : (
                                <button
                                  onClick={() => {
                                    v.IsBlock = true;
                                    useEditVideo(v, selectedUser.Channel.Id, () => handleGetUserVideos(selectedUser));
                                  }}
                                >
                                  Block
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              }
            </div>
          </div>
          ) : (
            <div>
              <div>Number of users : {numUsers}</div>
              <div>Number of Videos : {numVideos}</div>
              <div>Total of Videos size : {totalVideosSize} Mb</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Admin;