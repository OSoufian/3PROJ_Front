import "@/styles/Chat.css";
import { useGetUser } from '@/apis';
import { type User } from '@/types';

function Chat() {
  const [chat, setchat] = useState('');
  const [chats, setchats] = useState<string[]>([]);
  const [user, setUser] = useState<User | undefined>();

  const handleAddchat = (chat: string) => {
    setchats([...chats, chat]);
  };

  const handlechatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setchat(e.target.value);
  };

  const handlechatSubmit = () => {
    if (chat) { // check if chat is not empty
        handleAddchat(chat);
        // Clear the chat input field after submitting the chat
        setchat('');
      }
  };

  if (!!sessionStorage.token && !user) {
    useGetUser(sessionStorage.token, (c: any) => setUser(c))
  }

  return (
      <div className="chats-container">
        <div className="chat-list">
          {chats.map((chat, index) => (
            <div className="chat" key={index}>
              <b>{user?.Username}</b> {chat}
            </div>
          ))}
        </div>
        <div className="chat-form">
              <input
              type="text"
              placeholder="Add a chat..."
              value={chat}
              onChange={handlechatChange}
              />
              <button onClick={handlechatSubmit}>Send</button>
            </div>
      </div>
  );
}

export default Chat;