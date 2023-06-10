import React, { useState } from 'react';
import "@/styles/Chat.css";
import { type User } from '@/types';
import { useGetUser } from '@/apis';

interface ChatMessage {
  username?: string;
  chat: string;
}

interface Props {
  socket: WebSocket | null;
  videoId: number;
  chats: ChatMessage[];
}

function Chat(props: Props) {
  const { socket, videoId, chats } = props
  const [chat, setChat] = useState('');
  const [user, setUser] = useState<User | undefined>();

  const handleChatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(socket)
    setChat(event.target.value);
  };

  const handleChatSubmit = () => {
    if (chat && socket && socket.readyState === WebSocket.OPEN) {
      const message = { Username : user?.Username, message: chat, videoId: videoId }; // Include the video ID in the message object
      socket.send(JSON.stringify(message)); // Convert the object to a JSON string
      setChat('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent the default form submission behavior
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
            <b>{chat.username ? chat.username : 'Guest'}</b> {chat.chat}
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
