// import React, { useState, useEffect } from 'react';
// import "@/styles/Chat.css";
// import { type User } from '@/types';
// import { useGetUser } from '@/apis';
// // import useWebSocket from 'react-use-websocket';

// function Chat() {
//   const [chat, setChat] = useState('');
//   const [chats, setChats] = useState<string[]>([]);
//   const [user, setUser] = useState<User | undefined>();
//   const [socket, setSocket] = useState<WebSocket | null>(null);

//   useEffect(() => {
//     // Connect to the websocket server
//     const newSocket = new WebSocket('ws://localhost:3002/ws');

//     // Set the socket object
//     setSocket(newSocket);

//     // Handle incoming messages
//     newSocket.onmessage = (event) => {
//       const receivedChat = event.data;
//       setChats(prevChats => [...prevChats, receivedChat]);
//     };

//     // Clean up the socket connection on component unmount
//     return () => {
//       if (newSocket.readyState === WebSocket.OPEN) {
//         newSocket.close();
//       }
//     };
//   }, []);

//   const handleChatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setChat(event.target.value);
//   };

//   const handleChatSubmit = () => {
//     if (chat && socket && socket.readyState === WebSocket.OPEN) {
//       socket.send(chat);
//       console.log(chat)
//       setChat('');
//     }
//   };

//   const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === 'Enter') {
//       handleChatSubmit();
//     }
//   };

//   if (!!sessionStorage.token && !user) {
//     useGetUser(sessionStorage.token, (c: any) => setUser(c));
//   }

//   return (
//     <div className="chats-container dark:bg-#1F2937 dark:text-#C2C2C2">
//       <div className="chat-list">
//         {chats.map((chat, index) => (
//           <div className="chat" key={index}>
//             <b>{user?.Username ? user?.Username : 'Guest'}</b> {chat}
//           </div>
//         ))}
//       </div>
//       <div className="chat-form">
//         <input
//           className="chat-input dark:bg-#1F2937 dark:text-#C2C2C2"
//           type="text"
//           placeholder="Add a chat..."
//           value={chat}
//           onChange={handleChatChange}
//           onKeyDown={handleKeyDown}
//         />
//         <button className="chat-button" onClick={handleChatSubmit}>
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Chat;

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
