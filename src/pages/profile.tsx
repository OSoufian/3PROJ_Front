import { useGetUser, useImageUpload } from '@/apis';
import "@/styles/Profile.css"
import { type User} from '@/types';
function WebAuthn() {

  const [user, setUser] = useState<User | undefined>();

  if (!!sessionStorage.token && !user) {
    useGetUser(sessionStorage.token, (c: any) => setUser(c))
  }

  const openPopup = () => {
    const popup = window.open("", "uploadPopup", "width=600,height=400");
    if (popup) {
      const channel = new BroadcastChannel("uploadChannel");

      channel.onmessage = (event) => {
        if (event.data.type === "image") {
          const image = event.data.payload;
          // Do something with the uploaded image here
          useImageUpload(image, 3, (c: string)=>{
            if (!!user) {
              user.Icon = c
              popup.close()
            }
          })
        }
      };

      popup.document.write(`
        <html>
          <head>
            <title>Upload Image</title>
          </head>
          <body>
            <input type="file" accept="image/*" onchange="handleImageUpload(event)"/>
            <script>
              function handleImageUpload(event) {
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => {
                  const image = reader.result;
                  const channel = new BroadcastChannel("uploadChannel");
                  channel.postMessage({
                    type: "image",
                    payload: image,
                  });
                };
              }
            </script>
          </body>
        </html>
      `);
    }
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
            <img className="profile-icon" src={'https://www.feteduviolon.com/wp-content/uploads/2023/02/placeholder-1.png'} alt="User icon" onClick={
              (e) => openPopup()
            }/>
            <h1 className="profile-username">{user?.Username}</h1>
            <p className="profile-email">{user?.Email}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WebAuthn;
