import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEditMe, useGetUser, useImageUpload, useDeleteMe } from '@/apis';
import "@/styles/Profile.css"
import envVars from "@/../public/env-vars.json"

import { type User } from '@/types';

function Profile() {
  const [user, setUser] = useState<User | undefined>();
  const baseURL = envVars["user-url"]
  // const [channel, setChannel] = useState<ChannelType | undefined>();
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const navigate = useNavigate()

  if (!!sessionStorage.token && !user) {
    useGetUser(sessionStorage.token, (c: any) => setUser(c))
    // useGetMeChannel(sessionStorage.token, setChannel)
  }


  const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!!event.target.files && !!user) {
      useImageUpload(event.target.files[0], user.Id, (c: string) => {
        const updatedUser = { ...user, Icon: c };
        setUser(updatedUser);
        useEditMe(sessionStorage.token, updatedUser, () => {})
      });
    }
  };

  const handleDeactivateAccount = () => {
    const updatedUser = { ...user, Disable: !user?.Disable } as User;
    useEditMe(sessionStorage.token, updatedUser, () => {})
    setUser(updatedUser);
  };

  const handleDeleteAccount = () => {
    // if (user) useDeleteMeUser(sessionStorage.token, user, () => {
    //   useLogoutUser(sessionStorage.token, () => {})
    // })
    if (user) useDeleteMe(sessionStorage.token, user, () => {
      console.log("deleted")
      sessionStorage.clear()
      navigate("/")
    });
  };

  const openDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
  };

  return (
    <div style={{ marginBottom: 3 }}>
      {!sessionStorage.token ? (
        <div>
          <h1>Not logged</h1>
          <Link to="/connect" className="connect-link">
            Connect
          </Link>
        </div>
      ) : (
        <div className="profile-container">
          <div className="profile-header">
            <div className="icon-container">
              <img
                className="profile-icon"
                src={user?.Icon ? `${baseURL}/image?imagename=${user?.Icon}` : `${baseURL}/image?imagename=default.png`}
                alt="Icon"
              />
              <input id="icon-upload" type="file" accept="image/*" onChange={handleIconChange} style={{display:'none'}}/>
              <div className="upload-icon">
                <img src='https://cdn-icons-png.flaticon.com/512/126/126477.png' onClick={() => {
                  document.getElementById('icon-upload')?.click();
                }}></img>
              </div>
            </div>
            <div className="profile-infos">
              <h1 className="profile-username">{user?.Username}</h1>
              <p className="profile-email">{user?.Email}</p>
              <div>
                <div>
                  <div className="account-buttons">
                    {user?.Disable ? (
                      <button className="deactivate-button" onClick={handleDeactivateAccount}>
                        Reactivate Account
                      </button>
                    ) : (
                      <button className="deactivate-button" onClick={handleDeactivateAccount}>
                        Deactivate Account
                      </button>
                    )}
                    <button className="delete-button" onClick={openDeleteConfirmation}>
                      Delete Account
                    </button>
                  </div>
                  {isDeleteConfirmationOpen && (
                    <div className="delete-confirmation">
                      <p>Are you sure you want to delete your account?</p>
                      <div>
                        <button className="confirm-delete-button" onClick={handleDeleteAccount}>
                          Confirm
                        </button>
                        <button className="cancel-delete-button" onClick={closeDeleteConfirmation}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
                </div>

              </div>            
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;