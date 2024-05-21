import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import Chat from "./routes/chat/Chat";
import Study from "./routes/study/Study"
import FlashCardStudy, { flashCardsLoader } from "./routes/study/FlashCardStudy";
import ErrorPage from "./components/ErrorPage";
import { AuthProvider } from "./providers/AuthProvider";

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
      {
        path: "study/",
        element: <Study />,
      },
      {
        path: "study/:flashCardStatus",
        element: <FlashCardStudy />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
