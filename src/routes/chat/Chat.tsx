import { useRef, useEffect } from "react";
import { useFetcher, useParams, useLoaderData } from "react-router-dom";

import { API_BASE_URL } from "../../config";
import ChatLog from "./ChatLog";

export async function loader({ params }) {
  const chatId = params.chatId;
  const chatMessagesResponse = await fetch(
    `${API_BASE_URL}/chat_message/${chatId}`,
    {
      method: "GET",
      credentials: "include",
    },
  );
  const chatMessagesData = await chatMessagesResponse.json();
  return chatMessagesData.reverse();
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

  const response = await fetch(`${API_BASE_URL}/chat_message/${chatId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: message }),
    credentials: "include",
  });

  return response;
}

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
    <div>
      <div>Moshimosh! This is the Chat Page for {chatId}</div>

      <ChatLog messages={chatMessages} inputFormData={fetcher.formData} />

      <fetcher.Form method="post" ref={formRef}>
        <fieldset disabled={fetcher.state !== "idle"}>
          <textarea name="message" />
          <input type="hidden" name="chatId" value={chatId} />
          <button type="submit">Submit</button>
        </fieldset>
      </fetcher.Form>
    </div>
  );
}
