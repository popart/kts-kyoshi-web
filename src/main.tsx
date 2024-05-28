import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ReactDOM from "react-dom/client";
import App from "./App";
import Chat from "./routes/chat/Chat";
import ChatList from "./components/ChatList";
import StudyMenu from "./routes/study/StudyMenu";
import FlashCardList from "./routes/study/FlashCardList";
import FlashCardReview from "./routes/study/FlashCardReview";
import ErrorPage from "./components/ErrorPage";
import Settings from "./routes/settings/Settings";
import { AuthProvider } from "./providers/AuthProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "chat/",
        element: <ChatList />,
      },
      {
        path: "chat/:chatId",
        element: <Chat />,
      },
      {
        path: "study/",
        element: <StudyMenu />,
      },
      {
        path: "study/new",
        element: <FlashCardList />,
      },
      {
        path: "study/review",
        element: <FlashCardReview />,
      },
      {
        path: "settings/",
        element: <Settings />,
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
