import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import ReactDOM from 'react-dom/client'
import App from './App'
import Chat from './routes/chat/Chat'
import ErrorPage from './ErrorPage'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "chat/:chatId",
        element: <Chat />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
