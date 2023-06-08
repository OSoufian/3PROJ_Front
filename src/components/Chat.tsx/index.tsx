import React, { useState, useEffect } from 'react';
import "@/styles/Chat.css";
import { type User } from '@/types';
import { useGetUser } from '@/apis';
// import useWebSocket from 'react-use-websocket';

function Chat() {
  const [chat, setChat] = useState('');
  const [chats, setChats] = useState<string[]>([]);
  const [user, setUser] = useState<User | undefined>();
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    // Connect to the websocket server
    const newSocket = new WebSocket('ws://localhost:3002/ws');

    // Set the socket object
    setSocket(newSocket);

    // Handle incoming messages
    newSocket.onmessage = (event) => {
      const { message: receivedChat } = JSON.parse(event.data)
      console.log(receivedChat)
      setChats(prevChats => [...prevChats, receivedChat]);
    };

    // Clean up the socket connection on component unmount
    return () => {
      if (newSocket.readyState === WebSocket.OPEN) {
        newSocket.close();
      }
    };
  }, []);

  const handleChatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChat(event.target.value);
  };

  const handleChatSubmit = () => {
    if (chat && socket && socket.readyState === WebSocket.OPEN) {
      const message = { message: chat }; // Wrap the chat message in an object
      socket.send(JSON.stringify(message)); // Convert the object to a JSON string
      // setChats(prevChats => [...prevChats, chat]);
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

// import React, { useState, useEffect } from 'react';
// import "@/styles/Chat.css";
// import { type User } from '@/types';
// import { useGetUser } from '@/apis';

// function Chat({ videoId }: { videoId: number }) {
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
//       const { message: receivedChat, videoId: receivedVideoId } = JSON.parse(event.data);
//       console.log(receivedVideoId);
//       if (receivedVideoId === videoId) {
//         console.log(receivedChat);
//         setChats(prevChats => [...prevChats, receivedChat]);
//       }
//     };

//     // Clean up the socket connection on component unmount
//     return () => {
//       if (newSocket.readyState === WebSocket.OPEN) {
//         newSocket.close();
//       }
//     };
//   }, [videoId]);

//   const handleChatChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setChat(event.target.value);
//   };

//   const handleChatSubmit = () => {
//     if (chat && socket && socket.readyState === WebSocket.OPEN) {
//       const message = { message: chat, videoId: videoId }; // Include the video ID in the message object
//       socket.send(JSON.stringify(message)); // Convert the object to a JSON string
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
