import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchChatList } from "./services/chatService";

export default function ChatList() {
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
    </div>
  );
}
