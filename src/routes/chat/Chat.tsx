import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { css } from "@emotion/react";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";

import ChatMessageCarousel from "./ChatMessageCarousel";
import { fetchChatMessages, postChatMessage } from "../../services/chatService";
import { Box, Button, Stack, useTheme } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";

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
  font-size: 2rem;
  &:focus {
      outline: ${theme.palette.tertiary.light};
      border-color: ${theme.palette.tertiary.light};
      box-shadow: 0 0 0 1px ${theme.palette.tertiary.main};
  }
  `,
);

export default function Chat() {
  const theme = useTheme();

  const { chatId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [messages, setMessages] = useState([]);
  const [messageIndex, setMessageIndex] = useState(-1);

  const [showLimitExceeded, setShowLimitExceeded] = useState(false);
  const [showChatError, setShowChatError] = useState(false);

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

      const res = await postChatMessage(chatId, message);
      if (res.status === "SUCCESS") {
        await reloadMessagesAndResetPage();
        formRef.current.reset();
      }
      if (res.status === "LIMIT_EXCEEDED") {
        setShowLimitExceeded(true);
      }
      if (res.status === "ERROR") {
        setShowChatError(true);
      }
    } catch (error) {
      console.log("Error submitting message");
    } finally {
      setIsSubmitting(false);
    }
  };

  function handleShiftEnter(event) {
    if (event.key === "Enter") {
      if (!isSubmitting) {
        handleSubmit(event);
      }
    }
  }

  function genEmail() {
    const name = "andrew";
    const domain = "goginko";
    return `${name}@${domain}.com`;
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
            <Textarea
              minRows={2}
              css={{ flexGrow: 1 }}
              name="message"
              onKeyDown={handleShiftEnter}
            />
            <input type="hidden" name="chatId" value={chatId} />
            <Button
              css={{ marginLeft: "8px" }}
              type="submit"
              variant="contained"
              color="primary"
              sx={{ border: 1, borderColor: "primary.dark" }}
            >
              Submit
            </Button>
          </fieldset>
        </form>
      </Box>
      <Dialog
        open={showLimitExceeded}
        onClose={() => setShowLimitExceeded(false)}
      >
        <DialogTitle>Translation Limit Exceeded</DialogTitle>
        <DialogContent>
          I have to pay for each message to the translator AI, so I set the
          limit to 25 messages per day for now. You can come back in 24 hours
          and then get another 25 messages. If you think this app is great and
          you want to pay for it, or have any other feedback, let me know.
          <br />
          <br />
          Thanks!
          <br />
          {genEmail()}
        </DialogContent>
      </Dialog>
      <Dialog open={showChatError} onClose={() => setShowChatError(false)}>
        <DialogTitle>Chat Error</DialogTitle>
        <DialogContent>
          Couldn't process that message. Try another?
        </DialogContent>
      </Dialog>
    </Stack>
  );
}
