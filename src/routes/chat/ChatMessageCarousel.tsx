import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import ChatMessage from "./ChatMessage";
import { Button, Stack } from "@mui/material";

export default function ChatMessageCarousel({
  messages,
  messageIndex,
  setMessageIndex,
  reloadMessages,
}) {
  function incMessageIndex(inc: number) {
    let newIndex = messageIndex + inc;
    newIndex = Math.max(1, newIndex);
    newIndex = Math.min(messages.length - 1, newIndex);
    setMessageIndex(newIndex);
  }

  return (
    <Stack sx={{ height: "100%" }}>
      <Stack
        direction="row"
        p={1}
        sx={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => incMessageIndex(-2)}
          disabled={messageIndex <= 1}
          color="topBar"
        >
          <ArrowBackIosNewIcon />
        </Button>
        {messages.length >= 2 ? messages[messageIndex - 1].message : null}
        <Button
          onClick={() => incMessageIndex(2)}
          disabled={messageIndex >= messages.length - 1}
          color="topBar"
        >
          <ArrowForwardIosIcon />
        </Button>
      </Stack>
      <ChatMessage
        message={messages[messageIndex]}
        reloadMessages={reloadMessages}
      />
    </Stack>
  );
}
