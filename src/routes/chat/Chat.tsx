import { useRef, useEffect } from "react";
import { useFetcher, useParams, useLoaderData } from "react-router-dom";
import { css } from "@emotion/react";

import ChatLog from "./ChatLog";
import { fetchChatMessages, postChatMessage } from "../../services/chatService";

export async function loader({ params }) {
  const chatId = params.chatId;
  return await fetchChatMessages(chatId);
}

/*
 * The Form will call action. While it's loading,
 * fetcher.formData will have the form data for optimistic rendering.
 * Once we get a response, the page will update loader(),
 * which will pull in the latest list of messages.
 */
export async function action({ request }) {
  const formData = await request.formData();
  const chatId = formData.get("chatId");
  const message = formData.get("message");

  await postChatMessage(chatId, message);
  return null;
}

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
  const chatMessages = useLoaderData();
  const fetcher = useFetcher();
  const formRef = useRef(null);

  useEffect(() => {
    // TODO: don't clear the textarea if the submission fails?
    if (fetcher.state === "idle" && formRef.current) {
      formRef.current.reset();
    }
  }, [fetcher.state]);

  return (
    <div css={containerStyle}>
      <div css={chatLogStyle}>
        {chatMessages.length > 0 ? (
          <ChatLog messages={chatMessages} inputFormData={fetcher.formData} />
        ) : null}
      </div>

      <fetcher.Form method="post" ref={formRef}>
        <fieldset disabled={fetcher.state !== "idle"} css={chatInputStyle}>
          <textarea css={{ flexGrow: 1, height: "4em" }} name="message" />
          <input type="hidden" name="chatId" value={chatId} />
          <button css={{ marginLeft: "5px" }} type="submit">
            Submit
          </button>
        </fieldset>
      </fetcher.Form>
    </div>
  );
}
