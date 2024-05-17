import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import ReactDOM from 'react-dom/client'
import App, {
    createChatAction
} from './App'
import Chat, {
  loader as chatLoader,
  action as chatAction,
} from './routes/chat/Chat'
import ErrorPage from './ErrorPage'
import './index.css'
import{AuthProvider}from'./AuthProvider'; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    action: createChatAction,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "chat/:chatId",
        element: <Chat />,
        loader: chatLoader,
        action: chatAction,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
