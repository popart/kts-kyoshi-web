import { API_BASE_URL } from "../config";

export async function fetchChatList() {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      console.log(response);
      throw Error("fetchChatList() bad response");
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function createChat() {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
      credentials: "include",
    });

    if (!response.ok) {
      console.log(response);
      throw Error("createChat() bad response");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateChat(chatId: string, chatName: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/${chatId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_name: chatName,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      console.log(response);
      throw Error("updateChat() bad response");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteChat(chatId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/${chatId}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      console.log(response);
      throw Error("deleteChat() bad response");
    }
  } catch (error) {
    console.log(error);
  }
}

export async function fetchChatMessages(chatId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/chat_message/${chatId}`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      console.log("FAIL: could not fetch chat messages");
    }
    const chatMessagesData = await response.json();
    return chatMessagesData.reverse();
  } catch (error) {
    console.log(error);
  }
  return [];
}

export async function postChatMessage(chatId: string, message: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/chat_message/${chatId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: message }),
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}
