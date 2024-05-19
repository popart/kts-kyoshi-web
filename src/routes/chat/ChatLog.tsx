import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import ChatMessage from "./ChatMessage";
import { fetchChatMessages, postChatMessage } from "../../services/chatService";

const arrowIconStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  backgroundColor: "#1a1a1a",
  borderRadius: "4px",
});

async function loadChatMessages(chatId) {
  console.log(`fetching messages ${chatId}`)
  return await fetchChatMessages(chatId);
}

export default function ChatLog({ chatId }) {
  const [messages, setMessages] = useState([]);
  const [messageIndex, setMessageIndex] = useState(-1);
  const [viewingMessages, setViewingMessages] = useState([null, null]);

  // reloadMessage gets passed to children so they can reload data
  // without changing the messageIndex (used after saving a flashcard)
  const reloadMessages = async () => {
    const res = await loadChatMessages(chatId)
    setMessages(res) // asynchronouse
    return res
  }
  const reloadMessagesAndResetPage = async () => {
    const res = await reloadMessages()
    console.log(`messages.length = ${res.length}`)
    setMessageIndex(res.length - 1);
  }

  // page load triggers loading messages
  useEffect(() => {
    reloadMessagesAndResetPage()
  }, [])
  // setting messageIndex triggers setting viewingMessages
  useEffect(() => {
    setViewingMessages([messages[messageIndex - 1], messages[messageIndex]]);
  }, [messages, messageIndex]);

  function incMessageIndex(inc: number) {
    let newIndex = messageIndex + inc;
    newIndex = Math.max(1, newIndex);
    newIndex = Math.min(messages.length - 1, newIndex);
    setMessageIndex(newIndex);
  }

  return (
    <div css={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #ccc",
        }}
      >
        <button css={arrowIconStyle} onClick={() => incMessageIndex(-2)}>
          <ArrowBackIosNewIcon />
        </button>
        <ChatMessage message={viewingMessages[0]} reloadMessages={reloadMessages}/>
        <button css={arrowIconStyle} onClick={() => incMessageIndex(2)}>
          <ArrowForwardIosIcon />
        </button>
      </div>
      <ChatMessage message={viewingMessages[1]} reloadMessages={reloadMessages} />
    </div>
  );
}
