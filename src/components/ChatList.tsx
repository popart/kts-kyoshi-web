import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchChatList, createChat } from "../services/chatService";

interface ChatFormProps {
  onNewChat: () => void;
}

const ChatForm: React.FC<ChatFormProps> = ({ onNewChat }) => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createChat(); // You'll need to implement this function
    onNewChat();
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Create Chat</button>
    </form>
  );
};

const ChatList: React.FC = () => {
  const [chats, setChats] = useState([]);
  const loadChats = async () => {
    const chatData = await fetchChatList();
    setChats(chatData);
  };
  useEffect(() => {
    loadChats();
  }, []);

  return (
    <div>
      This is the list of all chats
      <ul>
        {chats.map((chat, index) => (
          <li key={index}>
            <Link to={`/chat/${chat.chat_id}`}>
              {chat.chat_id}: {chat.created_at}
            </Link>
          </li>
        ))}
      </ul>
      <ChatForm onNewChat={loadChats} />
    </div>
  );
};

export default ChatList;
