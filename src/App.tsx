import { Outlet, useLoaderData } from "react-router-dom";

import "./App.css";
import { API_BASE_URL } from "./config";
import ChatList from "./ChatList";

export async function chatListLoader() {
  const chatsResponse = await fetch(`${API_BASE_URL}/chat`);
  const chatsData = await chatsResponse.json();
  return chatsData;
}

export default function App() {
  const chats = useLoaderData();

  return (
    <>
      This is the main page...
      <ChatList chats={chats} />
      <Outlet />
    </>
  );
}
