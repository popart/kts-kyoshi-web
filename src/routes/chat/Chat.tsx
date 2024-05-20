import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { css } from "@emotion/react";

import ChatMessageCarousel from "./ChatMessageCarousel";
import { fetchChatMessages, postChatMessage } from "../../services/chatService";

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
});

export default function Chat({ params }) {
  const { chatId } = useParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [messages, setMessages] = useState([]);
  const [messageIndex, setMessageIndex] = useState(-1);

  // update message data without resetting messageIndex
  const reloadMessages = async () => {
    const res = await fetchChatMessages(chatId);
    setMessages(res); // asynchronous
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
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(event.target);
      const chatId = formData.get("chatId");
      const message = formData.get("message");

      await postChatMessage(chatId, message);
      await reloadMessagesAndResetPage();
      event.target.reset();
    } catch (error) {
      console.log("Error submitting message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div css={containerStyle}>
      <div css={chatLogStyle}>
        <ChatMessageCarousel
          messages={messages}
          setMessages={setMessages}
          messageIndex={messageIndex}
          setMessageIndex={setMessageIndex}
          reloadMessages={reloadMessages}
        />
      </div>

      <form method="post" onSubmit={handleSubmit}>
        <fieldset disabled={isSubmitting} css={chatInputStyle}>
          <textarea css={{ flexGrow: 1, height: "4em" }} name="message" />
          <input type="hidden" name="chatId" value={chatId} />
          <button css={{ marginLeft: "5px" }} type="submit">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}
