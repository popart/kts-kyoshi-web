import { Link, Outlet } from "react-router-dom";

export async function loader({ params }) {
  const chatId = params.chatId;
  return await fetchChatMessages(chatId);
}

export default function Study() {
  return (
    <div>
      <div><Link to="/study/new"> New </Link></div>
      <div><Link to="/study/review"> Review </Link></div>
    </div>
  );
}
