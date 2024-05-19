import { API_BASE_URL } from "../config";

export async function saveFlashCard(chatId, chatMessageId, cardIndex, save) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/flash_card/${chatId}/${chatMessageId}/${cardIndex}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ save: save }),
        credentials: "include",
      },
    );
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
