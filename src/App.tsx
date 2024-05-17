import { Form, Outlet } from "react-router-dom";

import "./App.css";
import { API_BASE_URL } from "./config";
import ChatList from "./ChatList";
import LoginWithGoogle from "./LoginWithGoogle";
import Logout from "./Logout";
import { useAuth } from "./AuthProvider";


export async function createChatAction({ request }) {
  const formData = await request.formData();

  const chatsResponse = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
    credentials: "include",
  });

  if (!chatsResponse.ok) {
    console.log("FAIL: could not create a chat");
    return null;
  }
  console.log("created a chat");
  console.log(chatsResponse);
  await chatsResponse.json();
  return null;
}

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      This is the main page...
      {isAuthenticated ? (
        <div>
          <ChatList />
          <Form method="POST">
            <button type="submit">Create Chat</button>
          </Form>
          <Logout />
        </div>
      ) : (
        <div>
          <p>Please log in to see your profile.</p>
          <LoginWithGoogle />
        </div>
      )}
      <Outlet />
    </>
  );
}
