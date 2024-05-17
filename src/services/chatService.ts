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
