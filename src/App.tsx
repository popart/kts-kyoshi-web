import { Outlet, useLoaderData } from "react-router-dom";

import "./App.css";
import { API_BASE_URL } from "./config";
import ChatList from "./ChatList";
import LoginWithGoogle from "./LoginWithGoogle";

export async function chatListLoader() {
  /*
  const token = localStorage.getItem('accessToken');
  console.log("_______chat-list-loader_________")
  console.log(token)
  */
  
  const chatsResponse = await fetch(`${API_BASE_URL}/chat`,
  {
    method:'GET',
    credentials: 'include',
    /*
    headers:{ 
      Authorization:`Bearer ${token}`
    }
   */
  });
  if (!chatsResponse.ok) {
    console.log("chat response bad")
    console.log(chatsResponse)
    return []
  }
  console.log("chat response NOT bad")
  console.log(chatsResponse)
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
      <LoginWithGoogle />
    </>
  );
}
