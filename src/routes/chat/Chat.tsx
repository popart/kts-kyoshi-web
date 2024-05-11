import React, { useState } from 'react';
import { useParams, useLoaderData } from 'react-router-dom';

import ChatLog from './ChatLog';


export async function loader({ params }) {
  const chatId = params.chatId;
  //const chat = await getChat(params.chatId);
  //return { chat };
  return {
    chatId: chatId
  }
}

export default function Chat() {
  const { chatId } = useLoaderData();
  const [messages, setMessages] = useState([`a message ${chatId}`])

  return (
    <div>
      <div>
      Moshimosh! This is the Chat Page for {chatId}
      </div>
      <button onClick={() => setMessages([...messages, "test message"])}>
        Add a test message
      </button>
      <ChatLog messages={messages} />
    </div>
  )
};

