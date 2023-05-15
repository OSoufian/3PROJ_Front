import "@/styles/Chat.css";
import { useGetUser } from '@/apis';
import { type User } from '@/types';

function Chat() {
  const [chat, setChat] = useState('');
  const [chats, setChats] = useState<string[]>([]);
  const [user, setUser] = useState<User | undefined>();

  const handleAddChat = (chat: string) => {
    setChats([...chats, chat]);
  };

  const handleChatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChat(event.target.value);
  };

  const handleChatSubmit = () => {
    if (chat) {
      handleAddChat(chat);
      setChat('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleChatSubmit();
    }
  };

  if (!!sessionStorage.token && !user) {
    useGetUser(sessionStorage.token, (c: any) => setUser(c));
  }

  return (
    <div className="chats-container dark:bg-#1F2937 dark:text-#C2C2C2">
      <div className="chat-list">
        {chats.map((chat, index) => (
          <div className="chat" key={index}>
            <b>{user?.Username ? user?.Username : 'Guest'}</b> {chat}
          </div>
        ))}
      </div>
      <div className="chat-form">
        <input
          className="chat-input dark:bg-#1F2937 dark:text-#C2C2C2"
          type="text"
          placeholder="Add a chat..."
          value={chat}
          onChange={handleChatChange}
          onKeyDown={handleKeyDown}
        />
        <button className="chat-button" onClick={handleChatSubmit}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;