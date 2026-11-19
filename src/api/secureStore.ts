
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const KEY = "FAKE_API_TOKEN";

export async function saveToken(value: string): Promise<void> {
  if (Platform.OS === "web") {
    localStorage.setItem(KEY, value);
    return;
  }

  await SecureStore.setItemAsync(KEY, value);
}

export async function getToken(): Promise<string | undefined> {
  if (Platform.OS === "web") {
    return localStorage.getItem(KEY) ?? undefined;
  }

  const result = await SecureStore.getItemAsync(KEY);
  return result ?? undefined;
}

export async function deleteToken(): Promise<void> {
  if (Platform.OS === "web") {
    localStorage.removeItem(KEY);
    return;
  }

  await SecureStore.deleteItemAsync(KEY);
}
