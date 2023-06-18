import React, { useState, useRef, useEffect } from 'react';
import "@/styles/Chat.css";
import { type User } from '@/types';
import { useGetUser } from '@/apis';
import { useGetAciveUsers } from '@/apis/chats/chat';

interface ChatMessage {
  username?: string;
  chat: string;
}

interface Props {
  socket: WebSocket | null;
  videoId: number;
  // connections: number;
}

function Chat(props: Props) {
  const { socket, videoId } = props;
  const [chat, setChat] = useState('');
  const [user, setUser] = useState<User | undefined>();
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [numConnections, setNumConnections] = useState<number>(0);
  const chatListRef = useRef<HTMLDivElement>(null); // Ref for chat list container

  useEffect(() => {
    
    if (videoId && !!socket) {

      socket.onmessage = (event) => {
        const { Username: receivedUsername, message: receivedChat, VideoId: receivedVideoId } = JSON.parse(event.data);
        if (receivedVideoId === videoId) {
          setChats(prevChats => [...prevChats, { username: receivedUsername, chat: receivedChat }]);
        }
      };

      // Update the number of connections when a connection is established or closed
      socket.onopen = () => {
        useGetAciveUsers((c: any) => {
          setNumConnections(c.numConnections)
        })
      };

      socket.onclose = () => {
        useGetAciveUsers((c: any) => {
          setNumConnections(c.numConnections)
        })
      };
   
      // Clean up the socket connection on component unmount
      return () => {
        if (socket.readyState === WebSocket.OPEN) {
          socket.close();
        }
      };
    }
  }, [socket])

  const handleChatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChat(event.target.value);
  };

  const handleChatSubmit = () => {
    if (chat && socket && socket.readyState === WebSocket.OPEN) {
      const message = { Username: user?.Username, message: chat, videoId: videoId };
      socket.send(JSON.stringify(message));
      setChat('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleChatSubmit();
    }
  };

  useEffect(() => {
    // Scroll to the bottom of the chat list when chats are updated
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [chats]);

  if (!!sessionStorage.token && !user) {
    useGetUser(sessionStorage.token, (c: any) => setUser(c));
  }

  return (
    <div className="chats-container dark:bg-#1F2937 dark:text-#C2C2C2">
      <div className="num-connections">Number of Connections: {numConnections}</div>
      <div className="chat-list" ref={chatListRef}>
        {chats.map((chat, index) => (
          <div className="chat" key={index}>
            <b>{chat.username ? chat.username : 'Guest'}</b> {chat.chat}
          </div>
        ))}
      </div>
      {!sessionStorage.token ? (
        <div>
          <h1>You have to be connected</h1>
          <Link to="/connect" className="connect-link">
            Connect
          </Link>
        </div>
      ) : (!user?.Disable ? (
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
      ): (
        <div>Your account has been disabled you cannot add a chat</div>
      )
      )}
    </div>
  );
}

export default Chat;
