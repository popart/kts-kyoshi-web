import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import Chat, {
  action as chatAction,
} from "./routes/chat/Chat";
import Study from "./routes/study/Study"
import FlashCardStudy, { newFlashCardsLoader, reviewFlashCardsLoader } from "./routes/study/FlashCardStudy";
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
        action: chatAction,
      },
      {
        path: "study/",
        element: <Study />,
        children: [
          {
            path: "new/",
            element: <FlashCardStudy />,
            loader: newFlashCardsLoader,
          },
          {
            path: "review/",
            element: <FlashCardStudy />,
            loader: reviewFlashCardsLoader,
          },
        ]
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
