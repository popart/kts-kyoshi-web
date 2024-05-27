import { API_BASE_URL } from "../config";

export async function login(token: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
      credentials: "include",
    });
    return response.ok;
  } catch (error) {
    console.log(error);
  }
  return false;
}

export async function logout() {
  try {
    const response = await fetch(`${API_BASE_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });
    return response.ok;
  } catch (error) {
    console.log(error);
  }
  return false;
}

export async function checkLogin() {
  try {
    const response = await fetch(`${API_BASE_URL}/check_login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (!response.ok) {
      console.log(response);
      throw Error("Could not determine login state");
    }
    const data = await response.json();
    return data.loggedIn;
  } catch (error) {
    console.log(error);
  }
  return false;
}
