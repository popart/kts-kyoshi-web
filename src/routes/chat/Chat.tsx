import React from 'react';
import { useParams, useLoaderData } from 'react-router-dom';

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
  return (
    <div>
      Moshimosh! This is the Chat Page for {chatId}
    </div>
  )
};

