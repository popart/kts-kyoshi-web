import { Outlet, useLoaderData } from "react-router-dom";

import "./App.css";
import { API_BASE_URL } from './config';
import ChatList from "./ChatList"

export async function chatListLoader() {
    const chats_response = await fetch(`${API_BASE_URL}/chat`);
    const chats_data = await chats_response.json();
    return chats_data;
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
