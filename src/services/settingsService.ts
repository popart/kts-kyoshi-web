import { API_BASE_URL } from "../config";

export async function getSettings(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/user_settings`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) {
      console.log(response);
      throw Error("getSettings() bad response");
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function saveSettings(settings): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/user_settings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
      credentials: "include",
    });
    if (!response.ok) {
      console.log(response);
      throw Error("getSettings() bad response");
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    return {};
  }
}
