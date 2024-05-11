import React, { useState } from 'react';
import { useFetcher, useParams, useLoaderData } from 'react-router-dom';

import ChatLog from './ChatLog';
import { postChat } from '../../api/api';


export async function loader({ params }) {
  const chatId = params.chatId;
  //const chat = await getChat(params.chatId);
  //return { chat };
  return [{
    chatId: chatId,
    message: "foobar",
  }]
}

/*
 * The Form will call action. While it's loading,
 * fetcher.formData will have the form data for optimistic rendering.
 * Once we get a response, the page will update loader(),
 * which should pull in the latest list of messages...
 * but i don't want to save the useless messages to the DB???
 * also, what's the point of the save method returning anything then??
 * (oh a remix app talks to db directly)
 */
export async function action() {
  console.log('...submitting form');
  const chatResponseMessage = await postChat("something");
  return { chatResponseMessage }
}

export default function Chat() {
  const chatMessages = useLoaderData();
  console.log(chatMessages);
  const fetcher = useFetcher();


  return (
    <div>
      <div>
      Moshimosh! This is the Chat Page for {chatMessages[0].chatId}
      {fetcher.formData ? fetcher.formData.get("inputMessage") : 'no data'}
      </div>

      <ChatLog messages={chatMessages} inputFormData={fetcher.formData} />

      <fetcher.Form method="post" >
        <textarea name="inputMessage" />
        <button type="submit">Submit</button>
      </fetcher.Form>
    </div>
  )
};

