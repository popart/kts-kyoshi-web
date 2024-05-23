import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import ReactDOM from "react-dom/client";
import App from "./App";
import Chat from "./routes/chat/Chat";
import StudyMenu from "./routes/study/StudyMenu";
import FlashCardList from "./routes/study/FlashCardList";
import FlashCardReview from "./routes/study/FlashCardReview";
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
