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
        direction="horizontal"
        sx={{ width: "100%", justifyContent: "space-between" }}
      >
        <Button onClick={() => incMessageIndex(-2)}>
          <ArrowBackIosNewIcon />
        </Button>
        <ChatMessage
          message={messages[messageIndex - 1]}
          reloadMessages={reloadMessages}
        />
        <Button onClick={() => incMessageIndex(2)}>
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
