import { Link } from "react-router-dom";

export default function ChatList({ chats }) {
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
