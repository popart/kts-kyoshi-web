import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { css } from "@emotion/react";

import ChatMessageCarousel from "./ChatMessageCarousel";
import { fetchChatMessages, postChatMessage } from "../../services/chatService";
import { Box, Button, Stack } from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';


const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  height: "100%",
});

const chatLogStyle = css({
  flexGrow: 1,
  minHeight: 0, // fixes scroll
});
const chatInputStyle = css({
  display: "flex",
  flexDirection: "row",
  border: "none",
  padding: "8px 0",
});

const Textarea = styled(TextareaAutosize)(
  ({ theme }) => `
  font-family: ${theme.typography.fontFamily};
  &:focus {
      outline: ${theme.palette.primary.light};
      border-color: ${theme.palette.primary.light};
      box-shadow: 0 0 0 1px ${theme.palette.primary.main};
  }
  `
);

export default function Chat() {
  const { chatId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [messages, setMessages] = useState([]);
  const [messageIndex, setMessageIndex] = useState(-1);

  const formRef = useRef<HTMLFormElement>(null);

  // update message data without resetting messageIndex
  const reloadMessages = async () => {
    const res = await fetchChatMessages(chatId);
    setMessages(res); // async, Stackhronous
    return res;
  };
  // update message data and swipe to latest message
  const reloadMessagesAndResetPage = async () => {
    const res = await reloadMessages();
    setMessageIndex(res.length - 1);
  };

  // page load triggers loading messages
  useEffect(() => {
    reloadMessagesAndResetPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(formRef.current);
      const chatId = formData.get("chatId");
      const message = formData.get("message");

      await postChatMessage(chatId, message);
      await reloadMessagesAndResetPage();
      formRef.current.reset();
    } catch (error) {
      console.log("Error submitting message");
    } finally {
      setIsSubmitting(false);
    }
  };

  function handleShiftEnter(event) {
    if (event.key === "Enter" && event.shiftKey) {
      if (!isSubmitting) {
        handleSubmit(event);
      }
    }
  }

  return (
    <Stack css={containerStyle}>
      <Box css={chatLogStyle}>
        <ChatMessageCarousel
          messages={messages}
          messageIndex={messageIndex}
          setMessageIndex={setMessageIndex}
          reloadMessages={reloadMessages}
        />
      </Box>

      <Box>
      <form method="post" onSubmit={handleSubmit} ref={formRef}>
        <fieldset disabled={isSubmitting} css={chatInputStyle}>
            <Textarea minRows={4} css={{ flexGrow: 1 }} name="message" onKeyDown={handleShiftEnter} />
          <input type="hidden" name="chatId" value={chatId} />
          <Button css={{ marginLeft: "8px" }} type="submit" variant="contained">
            Submit
          </Button>
        </fieldset>
      </form>
      </Box>
    </Stack>
  );
}
