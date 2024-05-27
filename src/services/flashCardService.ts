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

export async function fetchFlashCards(flashCardStatus) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/flash_cards/${flashCardStatus}`,
      {
        method: "GET",
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

export async function fetchFlashCardCounts() {
  try {
    const response = await fetch(`${API_BASE_URL}/flash_card_counts`, {
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

export async function reviewFlashCard(flashCardId, rating) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/review_flash_card/${flashCardId}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: rating }),
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

export async function deleteFlashCard(flashCardId: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/flash_card/${flashCardId}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!response.ok) {
      console.log(response);
      throw Error("deleteFlashCard() bad response");
    }

    return await response.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}
